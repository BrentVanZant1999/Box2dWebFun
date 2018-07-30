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
		
		var postDef = new b2BodyDef; 
		postDef.type = b2Body.b2_kinematicBody;
        postDef.userData = 'ball';
		
		var postFix = new b2FixtureDef;
		postFix.density =0.001;
		postFix.shape = new b2CircleShape(5);
        postFix.userData = 'ball'; 
		
		var blueOrb = new b2FixtureDef;
		blueOrb.density =0.001;
		blueOrb.friction = 0.2;
		blueOrb.restitution = .4; 
		blueOrb.shape = new b2CircleShape(15);
        blueOrb.userData = 'holding'; 
		
	   
		var blueOrb = new b2FixtureDef;
		blueOrb.density =0.001;
		blueOrb.friction = 0.2;
		blueOrb.restitution = .4; 
		blueOrb.shape = new b2CircleShape(15);
        blueOrb.userData = 'holding'; 
		
		var redOrb = new b2FixtureDef;
		redOrb.density = 0.001;
		redOrb.friction = 0.2;
		redOrb.restitution = .8; 
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
	 
	 
	 //set the positions 
	 
	 blueOrb1.SetPositionAndAngle(new b2Vec2(100, 60),0);
	 blueOrb2.SetPositionAndAngle(new b2Vec2(100, 200),Math.PI*1);
	 blueOrb3.SetPositionAndAngle(new b2Vec2(100, 340),Math.PI*1.5);
	 
	 redOrb1.SetPositionAndAngle(new b2Vec2(500, 60),0);
	 redOrb2.SetPositionAndAngle(new b2Vec2(500, 200),Math.PI*0.4);
	 redOrb3.SetPositionAndAngle(new b2Vec2(500, 340),Math.PI*1.2);	 
     
	 // Ground
     var boundryDef = new b2BodyDef;
     boundryDef.type = b2Body.b2_staticBody;
     
	 var boundryDefSide = new b2BodyDef;
     boundryDefSide.type = b2Body.b2_staticBody;
 
     var bound = new b2FixtureDef;
     bound.shape = new b2PolygonShape;
     bound.shape.SetAsBox(500,5);
	 
	 
     var boundSide = new b2FixtureDef;
     boundSide.shape = new b2PolygonShape;
     boundSide.shape.SetAsBox(5,225);
        
     var botBound = world.CreateBody(boundryDef);
     botBound.CreateFixture(bound); 
	 botBound.SetPositionAndAngle(new b2Vec2(500, 555),0);	 
	 
	 var topBound = world.CreateBody(boundryDef);
     topBound.CreateFixture(bound); 
	 topBound.SetPositionAndAngle(new b2Vec2(500, -5),0);	 
	 
	 var leftBound = world.CreateBody(boundryDefSide);
     leftBound.CreateFixture(boundSide); 
	 leftBound.SetPositionAndAngle(new b2Vec2(-5, 225),0);	 
	 
	 var rightBound = world.CreateBody(boundryDefSide);
     rightBound.CreateFixture(boundSide); 
	 rightBound.SetPositionAndAngle(new b2Vec2(1005, 225),0);	 
	
      
     var debugDraw = new b2DebugDraw();
     debugDraw.SetSprite ( document.getElementById ("canvas").getContext ("2d"));
     debugDraw.SetDrawScale(1);     //define scale
     debugDraw.SetFillAlpha(0.4);    //define transparency
     debugDraw.SetLineThickness(1.0);
     debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
     world.SetDebugDraw(debugDraw);
      
   var c=1;	  
   var mapKeys = []; 
   window.addEventListener("keydown", function (e) {
		mapKeys[e.keyCode] = true;
	});
   window.addEventListener("keyup", function (e) {
		mapKeys[e.keyCode] = false;
	});
 
//force
	function impulseRight(c) {
		if(c==1)   { 
			redOrb1.ApplyForce(new b2Vec2(100,0), redOrb1.GetWorldCenter(new b2Vec2(-15,0))); 
		}
	}
	function impulseLeft(c) {
		if(c==1)   { 
			redOrb1.ApplyForce(new b2Vec2(-100,0), redOrb1.GetWorldCenter(new b2Vec2(15,0))); 
		}
	}
	function impulseTop(c) {
		if(c==1)   { 
			redOrb1.ApplyForce(new b2Vec2(0,-100), redOrb1.GetWorldCenter(new b2Vec2(0,15)));  
		}
	}
	function impulseBot(c) {
		if(c==1)   { 
			redOrb1.ApplyForce(new b2Vec2(0,100), redOrb1.GetWorldCenter(new b2Vec2(0,-15)));  
		}
	}	  
	function checkKey() {
		
    if (mapKeys[87]) { //w 
		impulseTop(1);
    }
    if (mapKeys[83]) { //s 
        impulseBot(1);
    }
    if (mapKeys[65]) {
       impulseLeft(1);
    }
    if (mapKeys[68]) {
        impulseRight(1);
    }
	}
    
	window.setInterval(update,1000/60);
      
    function update() {
		 checkKey();
         world.Step(1 / 60, 10, 10);
         world.DrawDebugData();
         world.ClearForces();
     };
}