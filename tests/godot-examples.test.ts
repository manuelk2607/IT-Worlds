import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,cpSync,writeFileSync,rmSync,readFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

test('published Godot archive matches sources and contains no generated editor cache',()=>{
 const source=new URL('../public/projekte/pixel-lab/',import.meta.url);
 const archive=new URL('../public/downloads/pixel-lab.zip',import.meta.url);
 const listing=spawnSync('unzip',['-Z1',fileURLToPath(archive)],{encoding:'utf8'});
 assert.equal(listing.status,0);
 const names=listing.stdout.trim().split('\n').filter(name=>!name.endsWith('/'));
 assert.deepEqual(names.sort(),['main.gd','main.tscn','player.gd','project.godot']);
 for(const name of names){const result=spawnSync('unzip',['-p',fileURLToPath(archive),name]);assert.equal(result.status,0);assert.deepEqual(result.stdout,readFileSync(new URL(name,source)));}
});

test('Godot 4.5 imports and runs movement, actual collisions, collection, completion and repeat resets',{skip:!process.env.IT_WORLDS_GODOT},()=>{
 const binary=process.env.IT_WORLDS_GODOT!;
 const version=spawnSync(binary,['--headless','--version'],{encoding:'utf8',timeout:10000});assert.equal(version.status,0);assert.match(version.stdout,/^4\.5\./);
 const directory=mkdtempSync(join(tmpdir(),'it-worlds-godot-test-'));
 try{
  cpSync(new URL('../public/projekte/pixel-lab/',import.meta.url),directory,{recursive:true});
  const run=(args:string[])=>{const result=spawnSync(binary,['--headless','--path',directory,...args],{encoding:'utf8',timeout:30000});assert.ifError(result.error);assert.equal(result.status,0,result.stdout+'\n'+result.stderr);assert.doesNotMatch(result.stdout+result.stderr,/(?:SCRIPT ERROR|ERROR:|Parse Error|Assertion failed)/);return result.stdout;};
  run(['--import']);
  // Engine-language test fixture; the test runner and project tooling remain TypeScript.
  writeFileSync(join(directory,'verify.gd'),`extends SceneTree
func require(condition: bool, message: String) -> void:
    if not condition:
        push_error(message)
        quit(1)
func _initialize() -> void:
    call_deferred("verify")
func verify() -> void:
    var game = load("res://main.tscn").instantiate()
    root.add_child(game)
    await physics_frame
    await physics_frame
    require(game.score == 0 and game.player.position == Vector2(60,180), "Initial state")
    Input.action_press("ui_right")
    for i in range(10):
        await physics_frame
    require(game.player.position.x > 60, "Arrow input moves player")
    Input.action_press("ui_down")
    await physics_frame
    await physics_frame
    require(abs(game.player.velocity.length() - 180) < 0.1, "Diagonal speed remains bounded")
    Input.action_release("ui_down")
    game.player.position = Vector2(280,180)
    for i in range(20):
        await physics_frame
    Input.action_release("ui_right")
    require(game.player.position.x < 291, "Actual central wall blocks player")
    game.player.position = Vector2(20,180)
    Input.action_press("ui_left")
    for i in range(10):
        await physics_frame
    Input.action_release("ui_left")
    require(game.player.position.x >= 19, "Outer wall blocks escape")
    game.reset()
    await physics_frame
    for point in range(5):
        game.player.position = game.coin.position + Vector2(-40,0)
        Input.action_press("ui_right")
        for frame in range(15):
            await physics_frame
        Input.action_release("ui_right")
        await physics_frame
        await physics_frame
        require(game.score == point + 1, "Actual Area2D contact awards exactly one point")
    require(not game.player.is_physics_processing(), "Goal stops movement")
    require(game.label.text.contains("Complete!"), "Completion displayed")
    for i in range(5):
        game.reset()
        await physics_frame
        await physics_frame
        require(game.score == 0 and game.player.is_physics_processing(), "Restart clears completion: score=%d active=%s position=%s" % [game.score,game.player.is_physics_processing(),game.player.position])
        require(game.player.position == Vector2(60,180), "Restart restores position")
        require(is_instance_valid(game.coin), "Restart creates collectible")
    game.queue_free()
    await process_frame
    print("PASS: Godot engine movement, collisions, collection, completion, five resets")
    quit(0)
`);
  assert.match(run(['--script','res://verify.gd']),/PASS: Godot engine/);
 }finally{rmSync(directory,{recursive:true,force:true});}
});
