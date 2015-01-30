var mongoose = require('mongoose');
var db = mongoose.connection;

module.exports = function(){
	var userSchema = new mongoose.Schema({
	userID:String,
	nickName:{type:String,default:'joker'},
	password:{type:String,default:'jokerjoker'},
	regDate:{type:Date,default:Date.now},
	loginTimes:{type:Number,default:0},
	lastLoginDate:{type:Date,default:Date.now},
	gold:{type:Number,default:0},
	score:{type:Number,default:0},
	best:{type:Number,default:0},
	});
	db.model("user",userSchema);
	// 
	var rankTopSchema = new mongoose.Schema({
	creatDate:{type:Date, default:Date.now},
	year:{type:String, default:new Date().getFullYear()},
	month:{type:String, default:new Date().getMonth()},
	day:{type:String, default:new Date().getDay()},
	rankTop:{type:Array,default:new Array()}
	});
	db.model('rankTop',rankTopSchema);
	//
	var rankSchema = new mongoose.Schema({
		userID:String,
		nickName:String,
		recordDate:{type:Date,default:Date.now},
		records:Array,
		totalScore:{type:Number,default:0},
		rankIndex:{type:Number,default:-1}
	});
	rankSchema.method('getSend',function(){
		return {
			nickName:this.nickName,
			rankIndex:this.rankIndex,
			totalScore:this.totalScore
		}
	})
    db.model('rank',rankSchema);
}
