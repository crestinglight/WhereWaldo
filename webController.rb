require 'sinatra'
require 'pry'
require 'CSV'
require_relative 'csvMaker.rb'

get("/"){
	erb :index
}

get("/puzzle01"){
	erb :pic1
}

get("/puzzle01score"){
	writeToFile(params["scoreTime"], params["millis"])
	scores = getHighScores().to_s
	return scores
}

get("/puzzle01validate"){
	tf = validateXY(params["xPos"], params["yPos"])
	return tf.to_s
}