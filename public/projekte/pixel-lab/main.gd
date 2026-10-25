extends Node2D
const GOAL: int = 5
var player: CharacterBody2D
var coin: Area2D
var label: Label
var score: int = 0
func _ready() -> void:
    RenderingServer.set_default_clear_color(Color("152035"))
    player = CharacterBody2D.new()
    player.set_script(load("res://player.gd"))
    add_child(player)
    for wall in [Rect2(0,0,640,10),Rect2(0,350,640,10),Rect2(0,0,10,360),Rect2(630,0,10,360),Rect2(300,80,40,200)]:
        var body := StaticBody2D.new()
        body.position = wall.position + wall.size / 2
        var shape := CollisionShape2D.new()
        var rectangle := RectangleShape2D.new()
        rectangle.size = wall.size
        shape.shape = rectangle
        body.add_child(shape)
        var visual := Polygon2D.new()
        var half: Vector2 = wall.size / 2
        visual.polygon = PackedVector2Array([Vector2(-half.x,-half.y),Vector2(half.x,-half.y),half,Vector2(-half.x,half.y)])
        visual.color = Color.SLATE_GRAY
        body.add_child(visual)
        add_child(body)
    label = Label.new()
    label.position = Vector2(20,20)
    add_child(label)
    var button := Button.new()
    button.text = "Restart"
    button.position = Vector2(530,20)
    button.pressed.connect(reset)
    add_child(button)
    reset()
func reset() -> void:
    score = 0
    player.position = Vector2(60,180)
    player.velocity = Vector2.ZERO
    player.force_update_transform()
    player.set_physics_process(true)
    spawn_coin()
func spawn_coin() -> void:
    if is_instance_valid(coin):
        coin.queue_free()
    label.text = "Score: %d / %d — Arrow keys" % [score,GOAL]
    if score >= GOAL:
        label.text += " — Complete!"
        player.set_physics_process(false)
        return
    coin = Area2D.new()
    coin.monitoring = false
    coin.position = Vector2(560,180) if score % 2 == 0 else Vector2(60,60)
    var shape := CollisionShape2D.new()
    var circle := CircleShape2D.new()
    circle.radius = 12
    shape.shape = circle
    coin.add_child(shape)
    var visual := Polygon2D.new()
    var points := PackedVector2Array()
    for i in range(20):
        points.append(Vector2(cos(TAU*i/20.0),sin(TAU*i/20.0))*12)
    visual.polygon = points
    visual.color = Color.GOLD
    coin.add_child(visual)
    coin.body_entered.connect(collect.bind(coin))
    add_child(coin)
    arm_coin(coin)
func arm_coin(source: Area2D) -> void:
    # Let PhysicsServer receive a reset player transform before detecting overlaps.
    await get_tree().physics_frame
    await get_tree().physics_frame
    if is_instance_valid(source) and source == coin and not source.is_queued_for_deletion():
        source.set_deferred("monitoring",true)
func collect(body: Node2D, source: Area2D) -> void:
    if body != player or source != coin or source.is_queued_for_deletion() or source.get_meta("collected",false) or score >= GOAL:
        return
    coin.set_meta("collected",true)
    score += 1
    call_deferred("spawn_coin")
