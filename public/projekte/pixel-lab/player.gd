extends CharacterBody2D
var speed: float = 180.0
func _ready() -> void:
    var shape := CollisionShape2D.new()
    var rect := RectangleShape2D.new()
    rect.size = Vector2(20, 20)
    shape.shape = rect
    add_child(shape)
    var visual := Polygon2D.new()
    visual.polygon = PackedVector2Array([Vector2(-10,-10),Vector2(10,-10),Vector2(10,10),Vector2(-10,10)])
    visual.color = Color.CORNFLOWER_BLUE
    add_child(visual)
func _physics_process(_delta: float) -> void:
    velocity = Input.get_vector("ui_left", "ui_right", "ui_up", "ui_down") * speed
    move_and_slide()
