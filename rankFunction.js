var mongoose = require('mongoose');
var db = mongoose.connection;

var RankTop = db.model('rankTop');
var Rank = db.model('rank');

	// creatDate:{type:Date, default:Date.now},
	// year:{type:String, default:new Date().getFullYear},
	// month:{type:String, default:new Date().getMonth},
	// day:{type:String, default:new Date().getDay},
	// rankTop:Array
	
exports.sortRank = function(){
	// console.log('rank');
	// return;
	var now = new Date();
	RankTop.find({year:now.getFullYear,month:now.getFullYear,day:now.getFullYear,},
	function(err,docs){
		if(!err){
			var doc;
			if(docs.length > 0){
				doc = docs[0];
			}else{
				doc = new RankTop();
				doc.save();
			}
			Rank.find().sort({totalScore:-1}).exec(function(err,ranks){
				var rank;
				var _id;
				for(var i=0;i<ranks.length;i++){
					rank = ranks[i];
					rank.rankIndex = i+1;
					rank.save();
				}
				//doc.rankTop = ranks
			})
		}
	})
}

function sortRankList(a,b){
		return b.totalScore - a.totalScore
}
