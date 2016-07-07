---
layout: post
category : Game-Development
tags : [game-development, procedural-generation, programming]
tagline : In Which Meshes Are Generated
---

## TL;DR

Dual contouring is a handy technique for generating a mesh for volume data such as voxels or distance fields which preserves sharp corners, unlike the more famous marching squares.

## What Is Volume Data?

To represent the shapes we want to generate a mesh around we're going to use distance fields. With a distance field a shape is represented as a field of numbers, which represent the distance to the surface of the shape (negative values are *inside* the shape). If the field is generated on the fly from a formula the distance field can have effectively infinite resolution with zero memory usage. Generating this fields is pretty trivial, here's my definition of a circle:

```
public class Circle
  : IDistanceField
{
  private readonly Vector2 _center;
  private readonly float _radius;

  public Circle(Vector2 center, float radius)
  {
    _center = center;
    _radius = radius;
  }

  public float SampleDistance(Vector2 position)
  {
      return (_center - position).magnitude - _radius;
  }
}
```

That's all we need to represent a circle with *infinite* resolution. My little demo system only defines two core shapes at the moment; circle (as above) and half planes:

```
public class HalfPlane
  : IDistanceField
{
  private readonly Ray2D _ray;

  public HalfPlane(Vector2 normal, Vector2 position)
  {
    _ray = new Ray2D(position, normal.Perpendicular())
  }

  public float SampleDistance(Vector2 position)
  {
    var closest = _ray.ClosestPoint(position);
    var v = closest - position;
    var mag = v.magnitude;
    
    return mag * -Mathf.Sign(Vector2.Dot(_normal, v / mag));
}
```

Here the distance from the sample point to the plane is measured and then the sign is flipped depending on if we're to the left or right of the plane. This is slightly more complex but the idea is the same as the circle.

## Constructive Solid Geometry

The three fundamental operations of CSG are Union, intersection and difference:

<style>
 #image-container img {
 	max-height: 235px;
 	width: auto;
 }
</style>
 
<div id="image-container" align="center">
<img src="/assets/Union2D.png" width="30%">
<img src="/assets/Intersection2D.png" width="30%">
<img src="/assets/Difference.png" width="30%">
</div>

i.e. Union creates a shape which is filled where *either* of the initial shapes are. Intersection creates a shape which is filled where *both* of the initial shapes are. Difference creates a shape which is filled everywhere the first shape is, but not the second (subtraction).

Implementing these operations which distance fields is trivial. To Union two shapes we just take the minimum value from two fields:

```
public float SampleDistance(Vector2 position)
{
    return Mathf.Min(
      a.SampleDistance(position),
      b.SampleDistance(position)
    );
}
```

Intersection is the max:

```
public float SampleDistance(Vector2 position)
{
    return Mathf.Max(
      a.SampleDistance(position),
      b.SampleDistance(position)
    );
}
```

Difference can actually be built out of other operations. Logically difference is taking all the space where **A AND Not(B)**. Since intersection provides us with an "AND" operation, we can implement subtraction with a variation of intersection:

```
difference = Intersection(a, Negate(b));
```

Now that we have CSG let's define a test shape. A good test shape includes will include geometry which is difficult to produce so we want curves (the meshing algorithm must be detailed enough to produce smooth curves) as well as sharp corners (the meshing algorithm must detect the corner and create or properly). Here's what I came up with:

<div id="image-container" align="center">
<img src="/assets/smiley-csg.png" width="54%">
</div>

If you're trying to follow along and write your own code based on this article you'll need this code to produce that shape:

```
var e1 = new Circle(v(0.2f, 0.2f), f(0.05f));
var e2 = new Circle(v(0.2f, 0.8f), f(0.05f));
var m = new Difference(
    new Intersection(
        new Rectangle(v(0.6f, 0.15f), v(0.9f, 0.85f)),
        new Circle(v(0.35f, 0.5f), f(0.5f))
    ),
    new Circle(v(0.25f, 0.5f), f(0.5f))
);
var n = new Rectangle(v(0.4f, 0.45f), v(0.5f, 0.55f));

return Union.Create(e1, e2, m, n);
```

All the values are defined in the 0 to 1 range (i.e. the entire image fits in a 1x1 box). The *v* and *f* functions simply take those values and map them into whatever range you're really using.

## Sampling

We now have a distance field representing a complex shape, but how do we actually turn this into a mesh we can practically render? Obviously we need to sample the distance field at certain points, and then use that to generate a mesh.

### Grid Sampling

The obvious approach is just a regular sampling on a grid (for now just filling in voxels which are inside the shape):

<div id="image-container" align="center">
<img src="/assets/voxel-smiley.png" width="54%">
</div>

This hasn't really preserved the curves very well though, the eyes are basically just squares. To solve that we would need a more dense grid and that just isn't going to scale very well because we're wasting a huge amount of space storing grid points of completely empty space. What we need to do is sample the grid with more detail where the distance field is near zero.

### Quadtree Sampling

A quadtree is a tree of nodes, each node can contain exactly 4 children which fill in it's available space. This looks a little bit like this:

<div id="image-container" align="center">
<img src="/assets/quadtree.png" width="54%">
</div>

Here are have a quadtree with it's top level in red, this contains four children in green and one of those contains 4 children in blue.

With quadtree sampling we sample the distance field at the corner of each node and then (based on some decision function) recursively subdivide the nodes. This approach is called an "adaptively sampled distance field" and looks a bit like this:

<div id="image-container" align="center">
<img src="/assets/quadtree-smiley.png" width="54%">
</div>

The critical question is: what decision function do we use to direct subdivision of nodes? What we *want* is to subdivide only nodes which contain the surface of the shape, unfortunately this is (in general) pretty hard to detect just from a distance field. Consider this quadtree node:

<div id="image-container" align="center">
<img src="/assets/quadtree-problem.png" width="54%">
</div>

Here we have a very large single quadtree node which contains a small circle in the distance field. Because we only sample the distance field at the corners there's no simple way to tell that this node contains a circle (without sampling the field a load, which defies the entire point). Rather than try to solve the problem with just distance fields I went back and changed the definition of distance fields a little:

```
public interface IDistanceField
{
    float SampleDistance(Vector2 position);

    bool MayContainIsosurface(Rect rectangle);
}
```

The "MayContainIsosurface" method take a rectangle and returns a boolean which indicates if the surface of the shape may be within this rectangle. So when I defined the circle field earlier in the article I missed a bit out, here's what it really looks like:

```
public class Circle
    : IDistanceField
{
    public Circle(Vector2 center, float radius)
    {
        _circle = new BoundingCircle(center, radius);
    }

    public float SampleDistance(Vector2 position)
    {
        return (_circle.Center - position).magnitude - _circle.Radius;
    }

    public bool MayContainIsosurface(Rect rectangle)
    {
        if (!_circle.Overlaps(rectangle))
            return false;

        if (!_circle.Contains(rectangle))
            return false;

        return true;
    }
}
```

A rectangle might contain the surface of the circle if it overlaps the circle, but not if it is completely contained within the circle.

With this addition the problem of which node to subdivide is trivial - just check if the node area may contain the surface of the distance field.

Finally I added an additional check once the tree is fully subdivided down to some maximum level of detail. A given *interior* node contains 4 corner points and 5 interior points, if the 5 interior points can all be accurately calculated using just the 4 corner points we can safely discard the leaves because they're not providing any additional detail. For this I use a simple bilinear interpolation to calculate the 5 interior points:

```
function bilerp(x, y)
  var x_top = lerp(top_left, top_right, x);
  var x_bot = lerp(bot_left, bot_right, x);
  return lerp(x_top, y_top, y);
```

## Making meshes

Now that we have a suitably sampled distance field without horrible memory usage but still preserving detail we need to actually generate some meshes! The voxel filling technique I used earlier looks terrible because of the way the quadtree is structured (and was never a viable technique anyway, since it can't possibly preserve curves).

### Marching Squares

Marching squares is a fairly well known and very simple technique. We simply process each cell completely independently and match it to a lookup table based on the *sign* at each cell corner. There are sixteen total cases to consider (red indicates inside the shape, i.e. a negative distance):

<div id="image-container" align="center">
<img src="/assets/mc-1.png" width="12%">
<img src="/assets/mc-2.png" width="12%">
<img src="/assets/mc-3.png" width="12%">
<img src="/assets/mc-4.png" width="12%">
<img src="/assets/mc-5.png" width="12%">
<img src="/assets/mc-6.png" width="12%">
<img src="/assets/mc-7.png" width="12%">
<img src="/assets/mc-8.png" width="12%">
<img src="/assets/mc-9.png" width="12%">
<img src="/assets/mc-10.png" width="12%">
<img src="/assets/mc-11.png" width="12%">
<img src="/assets/mc-12.png" width="12%">
<img src="/assets/mc-13.png" width="12%">
<img src="/assets/mc-14.png" width="12%">
<img src="/assets/mc-15.png" width="12%">
<img src="/assets/mc-16.png" width="12%">
</div>

Here's a very simple example:

<div id="image-container" align="center">
<img src="/assets/quadtree-distances.png" width="54%">
</div>

The red circle is the surface of the distance field and I have tagged the corners of the nodes with distances. Marching cubes looks at each node one at a time so we'll do the same:

<div id="image-container" align="center">
<img src="/assets/quadtree-tl.png" width="48%">
<img src="/assets/quadtree-tr.png" width="48%">
<img src="/assets/quadtree-bl.png" width="48%">
<img src="/assets/quadtree-br.png" width="48%">
</div>

As you can see all we do is work out how far along the edge the surface is, and then place a straight line across the corner to connect these points.

The problem here is immediately obvious - any details which are inside the shape (curves or corners) are completely lost. We can fix the curves by simply sampling with more resolution but that does not fix corners - they will always be slightly rounded unless they lie *exactly* on a node edge. You can see this problem (exaggerated by a very low detail quadtree) here:

<div id="image-container" align="center">
<img src="/assets/mc-smiley.png" width="54%">
</div>

There's an additional problem not shown here. Because we consider each node independently the points on each node will not match up perfectly - this will leave tiny cracks (which become obvious with very large or very low detail fields, particularly in 3D).

### Dual Contouring

Dual contouring solves both of these problems at once by working with the *dual graph* of the quadtree.