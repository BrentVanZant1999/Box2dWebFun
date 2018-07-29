          window.onload = function() {
        var b2Vec2 = Box2D.Common.Math.b2Vec2;
        var b2BodyDef = Box2D.Dynamics.b2BodyDef;
		var b2Body = Box2D.Dynamics.b2Body;
		var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
		var b2World = Box2D.Dynamics.b2World;
		var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
		var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
		var b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef;
		var b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef;
		var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
		var b2Fixture = Box2D.Dynamics.b2Fixture;
		var b2AABB = Box2D.Collision.b2AABB;
 
 
		var world = new b2World(new b2Vec2(0,0), true);
      
     //circle		
		var orbDef = new b2BodyDef;
		orbDef.type = b2Body.b2_dynamicBody;
		orbDef.position.Set(4,8);
		orbDef.userData = 'orb';
      
		var blueOrb = new b2FixtureDef;
		blueOrb.density = 12.0;
		blueOrb.friction = 0;
		blueOrb.restitution = .4; 
		blueOrb.shape = new b2CircleShape(15);
        blueOrb.userData = 'holding'; 
		
		var redOrb = new b2FixtureDef;
		redOrb.density = 12.0;
		redOrb.friction = 0;
		redOrb.restitution = .4; 
		redOrb.shape = new b2CircleShape(15);
        redOrb.userData = 'holding'; 

		var blueOrb1 = world.CreateBody(orbDef);
		blueOrb1.CreateFixture(blueOrb);
		
		var blueOrb2 = world.CreateBody(orbDef);
		blueOrb2.CreateFixture(blueOrb);
		
		var blueOrb3 = world.CreateBody(orbDef);
		blueOrb3.CreateFixture(blueOrb);
		
		var redOrb1 = world.CreateBody(orbDef);
		redOrb1.CreateFixture(redOrb);
		
		var redOrb2 = world.CreateBody(orbDef);
		redOrb2.CreateFixture(redOrb);
		
		var redOrb3 = world.CreateBody(orbDef);
		redOrb3.CreateFixture(redOrb);
      
      //Setting angular velocity to  360 degrees per second and Setting initial position to  x = 2 and y = 3 and Initial Angle to 20 degrees anticlockwise
     blueOrb1.SetAngularVelocity(Math.PI*2);
	 blueOrb2.SetAngularVelocity(Math.PI*1);
	 blueOrb3.SetAngularVelocity(Math.PI*0.5);	 
	 
     blueOrb1.SetPositionAndAngle(new b2Vec2(100, 60),0);
	 blueOrb2.SetPositionAndAngle(new b2Vec2(100, 200),Math.PI*1);
	 blueOrb3.SetPositionAndAngle(new b2Vec2(100, 340),Math.PI*1.5);

	 redOrb1.SetAngularVelocity(Math.PI*2);
	 redOrb2.SetAngularVelocity(Math.PI*1);
	 redOrb3.SetAngularVelocity(Math.PI*0.5);	 
	 
	 redOrb1.SetPositionAndAngle(new b2Vec2(500, 60),0);
	 redOrb2.SetPositionAndAngle(new b2Vec2(500, 200),Math.PI*0.4);
	 redOrb3.SetPositionAndAngle(new b2Vec2(500, 340),Math.PI*1.2);	 
     // Ground
     var boundryDef = new b2BodyDef;
     boundryDef.type = b2Body.b2_staticBody;
     boundryDef.position.Set(300,400);
      
     var fd = new b2FixtureDef;
     fd.shape = new b2PolygonShape;
     fd.shape.SetAsBox(300,20);
        
     var holder = world.CreateBody(boundryDef);
     holder.CreateFixture(fd); 
      
     var debugDraw = new b2DebugDraw();
     debugDraw.SetSprite ( document.getElementById ("canvas").getContext ("2d"));
     debugDraw.SetDrawScale(1);     //define scale
     debugDraw.SetFillAlpha(0.4);    //define transparency
     debugDraw.SetLineThickness(1.0);
     debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
     world.SetDebugDraw(debugDraw);
      
     window.setInterval(update,1000/60);
      
     function update() {
         world.Step(1 / 60, 10, 10);
         world.DrawDebugData();
         world.ClearForces();
     };
		  }