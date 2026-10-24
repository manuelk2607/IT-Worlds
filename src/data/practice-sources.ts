import type {Source} from './content.ts';
const s=(url:string,title:string,publisher:string,version:string,section:string):Source=>({url,evidenceUrl:url,title,publisher,version,section,reviewedAt:'2026-10-24',description:section});
const godot=(page:string,title:string,section:string)=>s(`https://docs.godotengine.org/en/4.5/${page}.html`,title,'Godot Engine contributors','Godot 4.5 documentation',section);
export const practiceSources={
 typingSpeed:s('https://www.yorku.ca/mack/RN-TextEntrySpeed.html','A Note on Calculating Text Entry Speed','I. Scott MacKenzie · York University','2002 · updated 2024-10-19','Speed/accuracy trade-off; timing boundaries; five-character words including spaces'),
 typingEvaluation:s('https://www.yorku.ca/mack/chapter4.html','Evaluation of Text Entry Techniques','I. Scott MacKenzie · York University','Text Entry Systems · 2007 chapter · accessed 2026-10-24','Task conditions; speed measurement; independent participants; device differences'),
 hwCpuGpu:s('https://www.intel.com/content/www/us/en/products/docs/processors/cpu-vs-gpu.html','CPU vs. GPU','Intel','Living documentation · accessed 2026-10-24','CPU instruction execution; specialised parallel GPU workloads; complementary roles'),
 hwInterrupt:s('https://docs.kernel.org/core-api/genericirq.html','Linux generic IRQ handling','Linux kernel contributors','Living documentation · accessed 2026-10-24','Interrupt handling abstractions; controller hardware; high-level driver API'),
 hwLogic:s('https://www.nand2tetris.org/project01','Boolean Logic','Noam Nisan & Shimon Schocken · Nand2Tetris','Project 1 · accessed 2026-10-24','Background; primitive NAND; AND, OR, XOR and multiplexers'),
 hwArchitecture:s('https://www.nand2tetris.org/project05','Computer Architecture','Noam Nisan & Shimon Schocken · Nand2Tetris','Project 5 · accessed 2026-10-24','CPU, memory and complete computer; testing components before integration'),
 hwMachine:s('https://www.nand2tetris.org/project04','Machine Language Programming','Noam Nisan & Shimon Schocken · Nand2Tetris','Project 4 · accessed 2026-10-24','Binary machine instructions; symbolic assembly and translation'),
 hwAssembly:s('https://www.intel.com/content/www/us/en/gaming/resources/how-to-build-a-gaming-pc.html','How to build a PC','Intel','Living guide · accessed 2026-10-24','Tools; components; motherboard; CPU installation; cooling; storage; power; troubleshooting'),
 hwBoot:s('https://uefi.org/specs/UEFI/2.10/03_Boot_Manager.html','UEFI Boot Manager','UEFI Forum','UEFI Specification 2.10','3.1 · firmware policy; BootOrder; drivers and OS loaders'),
 hwDrivers:s('https://docs.kernel.org/driver-api/driver-model/overview.html','The Linux Kernel Device Model','Linux kernel contributors · Patrick Mochel','Living kernel documentation · accessed 2026-10-24','Overview; common device/bus model; discovery, shutdown and power management'),
 typingErgonomics:s('https://www.osha.gov/etools/computer-workstations/components/keyboards/','Computer Workstations · Keyboards','US Occupational Safety and Health Administration','eTool · accessed 2026-10-24','Placement; neutral wrists; relaxed shoulders; repetition and varied tasks'),
 typingPosture:s('https://www.osha.gov/etools/computer-workstations/positions','Good Working Positions','US Occupational Safety and Health Administration','eTool · accessed 2026-10-24','Neutral body positioning; changing position and taking movement breaks'),
 gameFirst:godot('getting_started/first_2d_game/index','Your first 2D game','Project structure; player movement; enemies; score; begin with 2D'),
 gameMovement:godot('tutorials/2d/2d_movement','2D movement overview','CharacterBody2D scene; input actions; eight-way movement'),
 gameBody:godot('classes/class_characterbody2d','CharacterBody2D','Description; velocity; move_and_slide uses physics-step delta automatically'),
 gameInput:godot('classes/class_input','Input','Input Map; get_vector length limit; just-pressed actions'),
 gameSignals:godot('getting_started/step_by_step/signals','Using signals','Node events; connections; reducing coupling'),
 gameTree:godot('classes/class_scenetree','SceneTree','Node hierarchy; groups; pause; scene switching; game loop'),
 gameUnity:s('https://docs.unity3d.com/6000.0/Documentation/Manual/GameObjects.html','Introduction to GameObjects','Unity Technologies','Unity 6.0 · 6000.0','GameObjects as component containers; Transform; renderer and collider'),
 gameUnityScripts:s('https://docs.unity3d.com/6000.0/Documentation/Manual/class-MonoBehaviour.html','MonoBehaviour components','Unity Technologies','Unity 6.0 · 6000.0','Script attachment; Start and Update; initialization'),
 gameUnreal:s('https://dev.epicgames.com/documentation/en-us/unreal-engine/actors-and-geometry-in-unreal-engine','Actors and Geometry','Epic Games','Unreal Engine 5.8 documentation · accessed 2026-10-24','AActor; level objects; transformations; spawning'),
 gameBlueprints:s('https://dev.epicgames.com/documentation/en-us/unreal-engine/blueprints-visual-scripting-in-unreal-engine','Blueprints Visual Scripting','Epic Games','Unreal Engine 5.8 documentation · accessed 2026-10-24','Node-based gameplay scripting; C++ extension points'),
} satisfies Record<string,Source>;
