library('RUnit')
source('solution.r')

dataSet = read.csv("../dataSets/CarWale_dataset")

test.slr <- function() {
    checkEquals(dataSet, slr(dataSet))
}

test.slr()
