import bpy, math
from mathutils import Vector

KEN = "/Users/obanla/Desktop/MY WEB APP/bigfella/public/models/kenney"

bpy.ops.object.select_all(action="SELECT"); bpy.ops.object.delete()
for c in (bpy.data.meshes, bpy.data.materials):
    for b in list(c): c.remove(b)

def mat(name,color,metallic=0.4,rough=0.45,coat=0.0):
    m=bpy.data.materials.new(name); m.use_nodes=True
    b=m.node_tree.nodes.get("Principled BSDF")
    b.inputs["Base Color"].default_value=(*color,1)
    b.inputs["Metallic"].default_value=metallic; b.inputs["Roughness"].default_value=rough
    if "Coat Weight" in b.inputs: b.inputs["Coat Weight"].default_value=coat
    return m

WHITE=mat("white",(0.90,0.91,0.92),0.0,0.22,0.6)     # painted white cab w/ clearcoat
DARK =mat("dark",(0.07,0.08,0.10),0.4,0.5)
TIRE =mat("tire",(0.035,0.035,0.045),0.0,0.8)
HUB  =mat("hub",(0.58,0.60,0.63),0.95,0.25)
CHROME=mat("chrome",(0.82,0.84,0.87),1.0,0.06)
GLASS=mat("glass",(0.05,0.07,0.11),0.25,0.04)
LIGHT=mat("lamp",(1.0,0.92,0.75),0.0,0.2)
DECK =mat("deck",(0.30,0.32,0.36),0.8,0.4)

trailer_objs=[]; body_objs=[]; detail_objs=[]
def box(size,loc,m,rot=(0,0,0),into=None):
    bpy.ops.mesh.primitive_cube_add(size=2,location=loc,rotation=rot)
    o=bpy.context.active_object; o.scale=(size[0]/2,size[1]/2,size[2]/2); o.data.materials.append(m)
    if into is not None: into.append(o)
    return o
def cyl(r,depth,loc,m,axis="y",verts=28,into=None):
    rot=(math.radians(90),0,0) if axis=="y" else (0,0,0)
    bpy.ops.mesh.primitive_cylinder_add(radius=r,depth=depth,location=loc,rotation=rot,vertices=verts)
    o=bpy.context.active_object; o.data.materials.append(m)
    if into is not None: into.append(o)
    return o
def wheel(x,y,z=0.62,r=0.62):
    cyl(r,0.42,(x,y,z),TIRE,into=detail_objs); cyl(r*0.45,0.44,(x,y,z),HUB,into=detail_objs)

W=1.22
# chassis + 5th wheel
box((11.6,1.7,0.22),(1.0,0,1.02),DARK,into=trailer_objs)
box((1.6,2.0,0.18),(5.4,0,1.18),DARK,into=trailer_objs)
# fuel tanks
cyl(0.36,1.5,(6.6,W+0.08,0.95),CHROME,verts=22,into=detail_objs); cyl(0.36,1.5,(6.6,-W-0.08,0.95),CHROME,verts=22,into=detail_objs)

# ===== CONVENTIONAL CAB BODY (long hood) — generous bevel =====
box((2.9,2.15,1.05),(9.0,0,1.78),WHITE,into=body_objs)            # hood (long, forward)
box((0.6,2.2,0.7),(10.45,0,1.55),WHITE,into=body_objs)            # hood nose drop
box((2.0,2.45,2.15),(6.95,0,2.42),WHITE,into=body_objs)           # cab
box((1.5,2.45,2.0),(5.35,0,2.55),WHITE,into=body_objs)            # sleeper
box((2.55,2.55,0.5),(6.3,0,3.45),WHITE,into=body_objs)            # roof cap
for s in (1,-1):                                                  # rounded front fenders over steer
    box((1.5,0.45,0.7),(9.1,s*(W+0.12),1.35),WHITE,into=body_objs)

# ===== CAB DETAILS — tiny bevel =====
box((0.18,1.7,1.0),(10.75,0,1.6),DARK,into=detail_objs)           # grille
for i in range(5): box((0.20,1.5,0.06),(10.84,0,1.2+i*0.18),CHROME,into=detail_objs)  # grille bars
box((0.14,0.5,0.34),(10.8,0.78,1.25),LIGHT,into=detail_objs); box((0.14,0.5,0.34),(10.8,-0.78,1.25),LIGHT,into=detail_objs)
box((0.5,2.55,0.3),(10.7,0,0.95),CHROME,into=detail_objs)         # bumper
box((0.40,2.3,1.1),(7.9,0,2.35),GLASS,rot=(0,math.radians(-22),0),into=detail_objs) # raked windshield
for s in (1,-1): box((1.5,0.04,0.85),(6.95,s*1.24,2.45),GLASS,into=detail_objs)      # side windows
cyl(0.11,2.1,(5.95,W+0.02,2.7),CHROME,axis="z",verts=16,into=detail_objs); cyl(0.11,2.1,(5.95,-W-0.02,2.7),CHROME,axis="z",verts=16,into=detail_objs)  # stacks
for s in (1,-1):
    box((0.06,0.12,0.55),(8.4,s*(W+0.22),2.6),DARK,into=detail_objs); box((0.05,0.30,0.42),(8.5,s*(W+0.36),2.62),DARK,into=detail_objs)  # mirrors

# ===== TRAILER (open 2-deck) =====
box((8.8,2.2,0.16),(-0.2,0,1.30),DECK,into=trailer_objs)
box((8.2,2.2,0.16),(-0.4,0,3.02),DECK,rot=(0,math.radians(5),0),into=trailer_objs)
for x in (-4.0,-1.7,0.6,3.0):
    for y in (-W,W): box((0.10,0.10,1.95),(x,y,2.12),HUB,into=trailer_objs)
for y in (-W,W): box((8.2,0.07,0.10),(-0.4,y,3.12),HUB,rot=(0,math.radians(5),0),into=trailer_objs)
box((1.3,2.2,0.14),(-4.7,0,2.55),DECK,rot=(0,math.radians(28),0),into=trailer_objs)
for y in (-W,W): box((0.08,0.55,0.5),(-4.8,y,0.7),DARK,into=trailer_objs)

# ===== WHEELS (steer + tandem drives + trailer tandem) =====
wheel(9.1,W); wheel(9.1,-W)                       # steer
for x in (5.0,6.1): wheel(x,W); wheel(x,-W)       # drives
for x in (-3.4,-2.2): wheel(x,W); wheel(x,-W)     # trailer

def join_bevel(objs, name, width, seg):
    bpy.ops.object.select_all(action="DESELECT")
    for o in objs: o.select_set(True)
    bpy.context.view_layer.objects.active=objs[0]; bpy.ops.object.join()
    o=bpy.context.active_object; o.name=name
    bv=o.modifiers.new("bev","BEVEL"); bv.width=width; bv.segments=seg; bv.limit_method="ANGLE"; bv.angle_limit=math.radians(40)
    bpy.ops.object.modifier_apply(modifier="bev"); bpy.ops.object.shade_smooth()
    return o

body=join_bevel(body_objs,"CabBody",0.045,4)
detail=join_bevel(detail_objs,"CabDetail",0.02,1)
trailer=join_bevel(trailer_objs,"Trailer",0.03,2)

# ===== cargo cars (premium colors) =====
PREMIUM=[(0.16,0.17,0.20),(0.60,0.62,0.65),(0.06,0.20,0.13),(0.26,0.05,0.09)]  # graphite, silver, deep-green, wine — NO blue
def recolor(obj,color):
    info=[]
    for m in obj.data.materials:
        if not m or not m.use_nodes: continue
        b=m.node_tree.nodes.get("Principled BSDF")
        if not b: continue
        c=b.inputs["Base Color"].default_value
        sat=max(c[0],c[1],c[2])-min(c[0],c[1],c[2]); val=max(c[0],c[1],c[2])
        info.append((m.name,round(sat,2),round(val,2)))
        # Kenney names the body panel material "paint<Color>" — target exactly that.
        if "paint" in m.name.lower():
            b.inputs["Base Color"].default_value=(*color,1)
            b.inputs["Metallic"].default_value=0.45; b.inputs["Roughness"].default_value=0.26
            if "Coat Weight" in b.inputs: b.inputs["Coat Weight"].default_value=1.0

def place_car(path,target_len,loc,color,yaw=180):
    before=set(bpy.data.objects)
    bpy.ops.import_scene.gltf(filepath=path)
    imp=[o for o in bpy.data.objects if o not in before]
    bpy.ops.object.select_all(action="DESELECT")
    for o in imp: o.select_set(True)
    bpy.ops.object.parent_clear(type="CLEAR_KEEP_TRANSFORM")
    meshes=[o for o in imp if o.type=="MESH"]
    for o in imp:
        if o.type!="MESH":
            try: bpy.data.objects.remove(o,do_unlink=True)
            except Exception: pass
    bpy.ops.object.select_all(action="DESELECT")
    for o in meshes: o.select_set(True)
    bpy.context.view_layer.objects.active=meshes[0]; bpy.ops.object.join()
    car=bpy.context.active_object
    bpy.ops.object.transform_apply(location=True,rotation=True,scale=True)
    bb=[car.matrix_world@Vector(c) for c in car.bound_box]
    dx=max(v.x for v in bb)-min(v.x for v in bb); dy=max(v.y for v in bb)-min(v.y for v in bb)
    car.scale=(target_len/max(dx,dy),)*3; bpy.ops.object.transform_apply(scale=True)
    if dy>dx: car.rotation_euler[2]=math.radians(90)
    car.rotation_euler[2]+=math.radians(yaw); bpy.ops.object.transform_apply(rotation=True)
    bb=[car.matrix_world@Vector(c) for c in car.bound_box]
    car.location=(loc[0]-(max(v.x for v in bb)+min(v.x for v in bb))/2,
                  loc[1]-(max(v.y for v in bb)+min(v.y for v in bb))/2,
                  loc[2]-min(v.z for v in bb))
    recolor(car,color)
    return car

place_car(f"{KEN}/suv.gltf",2.95,(2.3,0,1.40),PREMIUM[0])         # graphite
place_car(f"{KEN}/sports-sedan.gltf",2.95,(-1.0,0,1.40),PREMIUM[3]) # wine
place_car(f"{KEN}/suv-luxury.gltf",2.85,(1.7,0,3.12),PREMIUM[1])  # silver
place_car(f"{KEN}/sedan.gltf",2.80,(-1.8,0,3.02),PREMIUM[2])      # deep-green

bpy.ops.object.select_all(action="SELECT")
bpy.context.view_layer.objects.active=trailer; bpy.ops.object.join()
h=bpy.context.active_object; h.name="Hauler"
bpy.ops.object.origin_set(type="ORIGIN_GEOMETRY",center="BOUNDS"); h.location=(0,0,0)

out="/Users/obanla/Desktop/MY WEB APP/bigfella/public/models/hauler.glb"
bpy.ops.export_scene.gltf(filepath=out,export_format="GLB",use_selection=True)
print("EXPORTED",out)

sc=bpy.context.scene; sc.render.engine="CYCLES"; sc.cycles.samples=56
sc.render.resolution_x=1280; sc.render.resolution_y=760
w=bpy.data.worlds["World"]; w.use_nodes=True
bg=w.node_tree.nodes["Background"]; bg.inputs[0].default_value=(0.93,0.92,0.90,1); bg.inputs[1].default_value=1.3
bpy.ops.object.camera_add(location=(15,-11,6.2),rotation=(math.radians(73),0,math.radians(53))); sc.camera=bpy.context.active_object
bpy.ops.object.light_add(type="AREA",location=(6,-7,13)); bpy.context.active_object.data.energy=2600; bpy.context.active_object.data.size=16
bpy.ops.object.light_add(type="SUN",location=(-6,4,10)); bpy.context.active_object.data.energy=1.7
sc.render.filepath="/private/tmp/claude-501/-Users-obanla-Desktop-MY-WEB-APP/6bd4e015-0e63-4262-9bcd-81dead1b3ce1/scratchpad/hauler-preview.png"
bpy.ops.render.render(write_still=True); print("RENDERED")
