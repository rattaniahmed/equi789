<html>
	<head>
<script src="https://cdn.firebase.com/js/client/2.2.9/firebase.js"></script>
<script src="https://cdn.firebase.com/libs/firebase-util/0.2.5/firebase-util.min.js"></script>
<script>
    // Firebase.util.logLevel('log');
    // Firebase.util.log('hello world');
// var FIREBASE_ROOT = "https://myequitrack.firebaseio.com/";
// var userId = 'f9b9f2fb-1e82-41ad-b6a7-808f8c3efb0f';
// var userIndexRef = new Firebase(FIREBASE_ROOT + '/users/' + userId + '/horse_ids');
// var itemsRef = new Firebase(FIREBASE_ROOT + '/horses/');
// var ref = Firebase.util.NormalizedCollection(userIndexRef, itemsRef);
// console.log($firebase(ref).$asArray());



var baseRef = new Firebase("https://myequitrack.firebaseio.com/");
var ref = new Firebase.util.NormalizedCollection(
  baseRef.child("users/ed42152f-56d4-41ec-869d-f1fa3d3f3d2e/horse_ids"),
  baseRef.child("horses")
).select(
  {"key":"horses.$value"}
).ref();

// run it and see what we get
ref.on('value', function(snap) {
  console.log('profile updated!', snap.name(), snap.val());
});

</script>
	</head>
	<body>
	</body>
</html>