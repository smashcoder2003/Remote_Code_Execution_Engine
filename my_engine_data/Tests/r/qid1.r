library('RUnit')
source('solution.r')

dataSet = read.csv("../../Datasets/Cancer_dataset/incd.csv")

test.slr <- function() {
    checkEquals(dataSet, slr(dataSet))
}

test.slr()
