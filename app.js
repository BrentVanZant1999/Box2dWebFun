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
 
		//constants 
        const orbRadius = 12; 
		const postRadius = 6; 
		const forceApplied = 50;
		const ballMaxVel = 200;
		const mapCenterX = 500; 
		const mapCenterY = 275;
		const timeStep = 16.667; 
		const ballDefault = 6000;
		//event handling variables
		 var mapKeys = [];    
		 var orbPosses = [0,0,0,0,0,0]; 
		 var lastPosses = [0,0,0,0,0,0]; 		 

		//goal case variables
        var goalScored = false;
        var goalTimer = 3000;	
		
		
		//ball variables 
		var ballisHeld = false; 
		var ballPosAngle = 0; 
		var ballTimer = 6000;
			
		//body definitions	
		var orbDef = new b2BodyDef;
		orbDef.type = b2Body.b2_dynamicBody;
		orbDef.position.Set(4,8);
		orbDef.userData = 'orb';
		
		var postDef = new b2BodyDef; 
		postDef.type = b2Body.b2_staticBody;
        postDef.userData = 'post';
		
		var ballDef = new b2BodyDef; 
		ballDef.type = b2Body.b2_dynamicBody;
        ballDef.userData = 'ball';
		
		var postFix = new b2FixtureDef;
		postFix.density =0.001;
		postFix.shape = new b2CircleShape(postRadius);
        postFix.userData = 'post'; 
		
		var ballFix = new b2FixtureDef;
		ballFix.density =0.001;
		ballFix.restitution = 1; 
		ballFix.shape = new b2CircleShape(postRadius);
        ballFix.userData = 'post'; 
	   
		var blueOrb = new b2FixtureDef;
		blueOrb.density =0.001;
		blueOrb.friction = 0.2;
		blueOrb.restitution = 1; 
		blueOrb.shape = new b2CircleShape(orbRadius);
        blueOrb.userData = 'holding'; 
		
		var redOrb = new b2FixtureDef;
		redOrb.density = 0.001;
		redOrb.friction = 0.2;
		redOrb.restitution = 1; 
		redOrb.shape = new b2CircleShape(orbRadius);
        redOrb.userData = 'holding'; 

		//playerWorld
		var world = new b2World(new b2Vec2(0,0), true);
		
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
		boundSide.shape.SetAsBox(5,275);
        
		var botBound = world.CreateBody(boundryDef);
		botBound.CreateFixture(bound); 
		botBound.SetPositionAndAngle(new b2Vec2(500, 555),0);	 
	 
		var topBound = world.CreateBody(boundryDef);
		topBound.CreateFixture(bound); 
		topBound.SetPositionAndAngle(new b2Vec2(500, -5),0);	 
	 
		var leftBound = world.CreateBody(boundryDefSide);
		leftBound.CreateFixture(boundSide); 
		leftBound.SetPositionAndAngle(new b2Vec2(-5, 275),0);	 
	 
		var rightBound = world.CreateBody(boundryDefSide);
		rightBound.CreateFixture(boundSide); 
		rightBound.SetPositionAndAngle(new b2Vec2(1005, 275),0);	 
	    // END Ground
		
		// Goal Posts 
		var postRightTop = world.CreateBody(postDef);
		postRightTop.CreateFixture(postFix); 
		postRightTop.SetPositionAndAngle(new b2Vec2(125, 229),0);
		
		var postRightBot = world.CreateBody(postDef);
		postRightBot.CreateFixture(postFix); 
		postRightBot.SetPositionAndAngle(new b2Vec2(125, 321),0);
		
		var postLeftTop = world.CreateBody(postDef);
		postLeftTop.CreateFixture(postFix); 
		postLeftTop.SetPositionAndAngle(new b2Vec2(875, 229),0);
		
		var postLeftBot = world.CreateBody(postDef);
		postLeftBot.CreateFixture(postFix); 
		postLeftBot.SetPositionAndAngle(new b2Vec2(875, 321),0);
		// END Goal Posts       
		
		//ballWorld
		var ballWorld = new b2World(new b2Vec2(0,0), true);
		var ballPostRightTop = ballWorld.CreateBody(postDef);
		ballPostRightTop.CreateFixture(postFix); 
		ballPostRightTop.SetPositionAndAngle(new b2Vec2(125, 229),0);
		
		var ballPostRightBot = ballWorld.CreateBody(postDef);
		ballPostRightBot.CreateFixture(postFix); 
		ballPostRightBot.SetPositionAndAngle(new b2Vec2(125, 321),0);
		
		var ballPostLeftTop = ballWorld.CreateBody(postDef);
		ballPostLeftTop.CreateFixture(postFix); 
		ballPostLeftTop.SetPositionAndAngle(new b2Vec2(875, 229),0);
		
		var ballPostLeftBot = ballWorld.CreateBody(postDef);
		ballPostLeftBot.CreateFixture(postFix); 
		ballPostLeftBot.SetPositionAndAngle(new b2Vec2(875, 321),0);
		
		var botBoundBall = ballWorld.CreateBody(boundryDef);
		botBoundBall.CreateFixture(bound); 
		botBoundBall.SetPositionAndAngle(new b2Vec2(500, 555),0);	 
	 
		var topBoundBall = ballWorld.CreateBody(boundryDef);
		topBoundBall.CreateFixture(bound); 
		topBoundBall.SetPositionAndAngle(new b2Vec2(500, -5),0);	 
	 
		var leftBoundBall = ballWorld.CreateBody(boundryDefSide);
		leftBoundBall.CreateFixture(boundSide); 
		leftBoundBall.SetPositionAndAngle(new b2Vec2(-5, 275),0);	 
	 
		var rightBoundBall= ballWorld.CreateBody(boundryDefSide);
		rightBoundBall.CreateFixture(boundSide); 
		rightBoundBall.SetPositionAndAngle(new b2Vec2(1005, 275),0);	
		
		var ball =  ballWorld.CreateBody(ballDef);
		ball.CreateFixture(ballFix); 
		ball.SetPositionAndAngle(new b2Vec2(500, 275),0);
		
		
		
		 
   //key mapping
   window.addEventListener("keydown", function (e) {
		mapKeys[e.keyCode] = true;
	});
    window.addEventListener("keyup", function (e) {
		mapKeys[e.keyCode] = false;
	});
	
	//force
	function impulseRight() {
		redOrb1.ApplyForce(new b2Vec2(forceApplied,0), redOrb1.GetWorldCenter(new b2Vec2(-15,0))); 
	}
	function impulseLeft() {
		redOrb1.ApplyForce(new b2Vec2(-(forceApplied),0), redOrb1.GetWorldCenter(new b2Vec2(15,0)));
	}
	function impulseTop() {
		redOrb1.ApplyForce(new b2Vec2(0,-(forceApplied)), redOrb1.GetWorldCenter(new b2Vec2(0,15)));
	}
	function impulseBot() {
		redOrb1.ApplyForce(new b2Vec2(0,forceApplied), redOrb1.GetWorldCenter(new b2Vec2(0,-15)));
	}

	function shotHandler(orbIndex) {
		//
	}
	function throwBall(angle) {
		 ball.SetAwake(true);
		 var xVel = ballMaxVel*(Math.cos(angle)); 
		 var yVel = ballMaxVel*(Math.sin(angle)); 
	     ball.SetLinearVelocity(new b2Vec2(xVel, yVel));
		 ballisHeld = false;
	}
	
	function checkCollision(ballX, ballY, orbX, orbY){
		var dist = getDistance(ballX, ballY, orbX, orbY);
		if ( dist <= orbRadius+postRadius ) {
			console.log("true");
			return true; 
		}
		return false;
	}
	function getDistance(xOne, yOne, xTwo, yTwo) {
		var distance = 0;
		distance = Math.hypot(xTwo-xOne, yTwo-yOne);
		return distance; 
	}
	function checkKey() {
		if (mapKeys[87]) { //w 
			impulseTop();
		}
		if (mapKeys[83]) { //s 
			impulseBot();
		}
		if (mapKeys[65]) {
			impulseLeft();
		}
		if (mapKeys[68]) {
			impulseRight();
		}
		if (mapKeys[90]) {
			throwBall(0);
		}
	}
	function drawOrb(xCen, yCen, color) {
		var canvas = document.getElementById("canvas");
		var ctx = canvas.getContext("2d");
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc(xCen, yCen, orbRadius, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.fill();
	}
	function drawBall(xCen, yCen, color) {
		var canvas = document.getElementById("canvas");
		var ctx = canvas.getContext("2d");
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc(xCen, yCen, postRadius, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.fill();
	}
	function drawPosts(color) {
		var canvas = document.getElementById("canvas");
		var ctx = canvas.getContext("2d");
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc(875, 321, postRadius, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.fill();
		ctx.beginPath();
		ctx.arc(875, 229, postRadius, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.fill();
		ctx.beginPath();
		ctx.arc(125, 321, postRadius, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.fill();
		ctx.beginPath();
		ctx.arc(125, 229, postRadius, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.fill();
	}
	
	
    function drawWorld() {
		var canvas = document.getElementById("canvas");
		var context = canvas.getContext('2d');
		context.clearRect(0, 0, canvas.width, canvas.height);
		
		var pos = new b2Vec2();
		var xCenter = 0; 
		var yCenter = 0; 
		drawPosts("#FFFFFF"); 
		
		pos = ball.GetPosition(); 
		xCenter = pos.x;
		yCenter = pos.y;
		drawBall(xCenter,yCenter,"#FFFFFF");
		
		pos = redOrb1.GetPosition(); 
		xCenter = pos.x;
		yCenter = pos.y;
		drawOrb(xCenter,yCenter,"#00FF00");
		
		pos = redOrb2.GetPosition();
		xCenter = pos.x;
		yCenter = pos.y;		
		drawOrb(xCenter,yCenter,"#00FF00");

		pos = redOrb3.GetPosition();
		xCenter = pos.x;
		yCenter = pos.y;		
		drawOrb(xCenter,yCenter,"#00FF00");
	
		pos = blueOrb1.GetPosition(); 
		xCenter = pos.x;
		yCenter = pos.y;
		drawOrb(xCenter,yCenter,"#0000FF");
		
		pos = blueOrb2.GetPosition();
		xCenter = pos.x;
		yCenter = pos.y;		
		drawOrb(xCenter,yCenter,"#0000FF");

		pos = blueOrb3.GetPosition();
		xCenter = pos.x;
		yCenter = pos.y;		
		drawOrb(xCenter,yCenter,"#0000FF"); 		
		

		//draw using canvas 
	}
	function ballCalc(){
		//calculate where it should be on orb
		//check if ball should be ejected
		if (ballisHeld) {
			ballTimer = ballTimer - timeStep;
			console.log(ballTimer);


			if ( ballTimer <= 0 )
			{
				throwBall(Math.random() * (Math.PI*2));
			}
		}
		//checks if the ball is being collided with by an orb
		else { 
			//check if there is a collision 
			for ( var i = 0; i < 6; i++ ) {
				if ( i === 0 ) {
					if (checkCollision(ball.GetPosition().x, ball.GetPosition().y, blueOrb1.GetPosition().x, blueOrb1.GetPosition().y))
					{
						ballPosAngle = Math.atan2(blueOrb1.GetPosition().y - ball.GetPosition().y, blueOrb1.GetPosition().x - ball.GetPosition().x);
						orbPosses = [0,0,0,0,0,0];
						lastPosses = [0,0,0,0,0,0];
						orbPosses[i] = 1;
						lastPosses[i] = 1; 	
						ballisHeld = true; 
						ballTimer = ballDefault;
						break; 
					}
				}
				else if ( i === 1) {
					if (checkCollision(ball.GetPosition().x,ball.GetPosition().y , blueOrb2.GetPosition().x, blueOrb2.GetPosition().y))
					{
						ballPosAngle = Math.atan2(blueOrb2.GetPosition().y - ball.GetPosition().y, blueOrb2.GetPosition().x - ball.GetPosition().x);
						orbPosses = [0,0,0,0,0,0];
						lastPosses = [0,0,0,0,0,0];
						orbPosses[i] = 1;
						lastPosses[i] = 1; 	
						ballisHeld = true; 
						ballTimer = ballDefault;
						break; 
					}
				}
				else if ( i === 2) {
					if (checkCollision(ball.GetPosition().x,ball.GetPosition().y , blueOrb3.GetPosition().x, blueOrb3.GetPosition().y))
					{
						ballPosAngle = Math.atan2(blueOrb3.GetPosition().y - ball.GetPosition().y, blueOrb3.GetPosition().x - ball.GetPosition().x);
						orbPosses = [0,0,0,0,0,0];
						lastPosses = [0,0,0,0,0,0];
						orbPosses[i] = 1;
						lastPosses[i] = 1; 	
						ballisHeld = true; 
						ballTimer = ballDefault;
						break; 
					}
				}
				else if ( i === 3) {
					if (checkCollision(ball.GetPosition().x,ball.GetPosition().y , redOrb1.GetPosition().x, redOrb1.GetPosition().y))
					{
						ballPosAngle = Math.atan2(redOrb1.GetPosition().y - ball.GetPosition().y, redOrb1.GetPosition().x - ball.GetPosition().x);
						orbPosses = [0,0,0,0,0,0];
						lastPosses = [0,0,0,0,0,0];
						orbPosses[i] = 1;
						lastPosses[i] = 1; 	
						ballisHeld = true; 
						ballTimer = ballDefault;
						break; 
					}
				}
				else if ( i === 4) {
					if (checkCollision(ball.GetPosition().x,ball.GetPosition().y , redOrb2.GetPosition().x, redOrb2.GetPosition().y))
					{
						ballPosAngle = Math.atan2(redOrb2.GetPosition().y - ball.GetPosition().y, redOrb2.GetPosition().x - ball.GetPosition().x);
						orbPosses = [0,0,0,0,0,0];
						lastPosses = [0,0,0,0,0,0];
						orbPosses[i] = 1;
						lastPosses[i] = 1; 	
						ballisHeld = true;
						ballTimer = ballDefault;						
						break; 
					}
				}
				else if ( i === 5) {
					if (checkCollision(ball.GetPosition().x,ball.GetPosition().y , redOrb3.GetPosition().x, redOrb3.GetPosition().y))
					{
						ballPosAngle = Math.atan2(redOrb3.GetPosition().y - ball.GetPosition().y, redOrb3.GetPosition().x - ball.GetPosition().x);
						orbPosses = [0,0,0,0,0,0];
						lastPosses = [0,0,0,0,0,0];
						orbPosses[i] = 1;
						lastPosses[i] = 1; 	
						ballisHeld = true; 
						ballTimer = ballDefault;
						break; 
					}
				}
			
			}			
		}
	}
	
	
	window.setInterval(update,1000/60);
    function update() {
		 checkKey();
         world.Step(1 / 60, 10, 10);
		 world.ClearForces();
		 ballWorld.Step(1 / 60, 10, 10);
		 ballWorld.ClearForces();
		 ballCalc();
		 //goalCalc(); 
		 drawWorld(); 
    };
}