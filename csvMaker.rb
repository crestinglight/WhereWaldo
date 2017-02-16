def writeToFile(score, millis)
	File.open("waldoScores.csv", "a") do |x|
		x.puts score + "," + millis + "\n"
		x.close
	end
end

def sortCSV()
	scoreCSV = CSV.read 'waldoScores.csv'

	scoreCSV.sort! { |b, a| a[0].to_i <=> b[0].to_i }
	scoreCSV.uniq!(&:first)

	scoreCSV.each { |line| p line }
end