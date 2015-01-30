var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var db = mongoose.connection;

var RankTop = db.model('rankTop');
var Rank = db.model('rank');
var User = db.model("user");

var maxRankRecord = 5;


router.post('/add',function(req,res,next){
	var userID = req.body.userID;
	var record = req.body.record;
	User.findOne({userID:userID},function(err,user){
		if(err){
			return res.end();
		}
		Rank.findOne({userID:userID},function(err2,doc){
		// console.log(':::'+doc);
		if(doc)
		{
			var now = new Date();
			var rArr = doc.records;
			var rankDate = doc.recordDate
			if(rankDate.getDate == now.getDate
			&& rankDate.getMonth == now.getMonth
			&& rankDate.getFullYear == now.getFullYear){
				if(rArr.length >= maxRankRecord){
					rArr.sort(sortNumber);
					if(Number(rArr[0])<Number(record)) 
 					{
						rArr[0] = record;
					}
				}else{
					rArr.push(record);
				}
			}else{
				doc.recordDate = new Date();
				rArr = new Array;
				rArr.push(record);
			}
			doc.records = rArr;
			doc.totalScore = getTotalScore(rArr);
			doc.save();
			// var _id = doc._id;
			// delete doc._id;
			// Rank.update({_id:_id},doc,function(err,num,raw)
				// {
					// console.log('rank update:',raw);
				// });
		}
		else{
			var rk = new Rank();
			rk.userID = userID;
			rk.nickName = user.nickName;
			rk.records = new Array(record);
			rk.totalScore = getTotalScore(rk.records);
			rk.save(function(err){
				if(err){
					console.log(err);
				}
			})
		}
		res.end();
		})
	})
	
})

/* GET Rank List */
router.post('/list', function(req, res, next) {
	var userID = req.body.userID
	console.log('get list:'+userID);
	User.findOne({userID:userID},function(err,user){
		if(!err || !user){
			Rank.findOne({userID:user.userID},function(err2,rank){
				var rankIndex = rank.rankIndex;
				if(rankIndex!=-1){
					Rank.find({rankIndex:{$gte:rankIndex-2},rankIndex:{$lte:rankIndex+2}},
					function(err,nears){
						var rankList = new Array();
						for(var i=0;i<nears.length;i++){
							rankList.push(nears[i].getSend());
						}
						console.log(rankList);
						res.send(rankList);
					});
				}else{
					res.end();
				}
			})
		}else{
			res.end();
			console.log(err);
		}
	})
})

function getTotalScore(arr)
{
	//console.log(arr);
	var total = 0;
	if(arr)
	{
		for(var i=0;i<arr.length;i++)
		{
			total += Number(arr[i]);
		}
	}
	//console.log(total);
	return total;
}

function sortNumber(a,b)
{
	return a-b
}

module.exports = router;
