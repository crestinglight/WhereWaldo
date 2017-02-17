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
	topTenArray = turnIntoArray(sorted)
	return topTenArray
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

def validateXY(x, y)
	intX = x.to_i
	intY = y.to_i
	if (intX > 380) && (intX < 419) && (intY > 262) && (intY < 302)
		return true
	else
		return false
	end
end
