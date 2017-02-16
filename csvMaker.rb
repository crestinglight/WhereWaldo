def writeToFile(score, millis)
	File.open("waldoScores.csv", "a") do |x|
		x.puts score + "," + millis + "\n"
		x.close
	end
end

def getHighScores()
	topTen = sortCSV()
	return topTen
end

def sortCSV()
	scoreCSV = CSV.read('waldoScores.csv')
	sorted = scoreCSV.sort
	topTenBlah = turnIntoArray(sorted)
	return topTenBlah
end

def turnIntoArray(sortedArray)
	newArray = []
	for i in 0..9
		if sortedArray[i] != nil
			newArray = newArray.push(sortedArray[i])
		else
		end
	end
	return newArray
end
