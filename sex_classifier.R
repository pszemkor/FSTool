#!/usr/bin/env Rscript

library(rmcfs)
library(dplyr)
args = commandArgs(trailingOnly = TRUE)
path <- "data.csv"
label <- "SEX"
print(path)
# label column name
df <- read.table(path, header = TRUE, sep = ",")

data <- select(df, - INITIALS)

result <- mcfs(SEX ~ ., data, cutoffPermutations = 5, seed = 2, threadsNumber = 8)

plot(result, type = "distances")
plot(result, type = "ri", size = 50, plot_permutations = TRUE)
plot(result, type = "id", size = 50)
plot(result, type = "features", size = 10)
gid <- build.idgraph(result)
plot(gid, label_dist = 1)
gid <- build.idgraph(result, size_ID = 12)
plot(gid, label_dist = 1)
plot(result, type = "cv", measure = "wacc")
print(result)






# ************************************************************************
# x <- matrix(1:10, ncol = 5)
#
# fil <- file("file.txt")
# # the file data contains x, two rows, five cols
# # 1 3 5 7 9 will form the first row
# write(t(x), fil)
# if(interactive()) file.show(fil)
# unlink(fil) # tidy up
#
# # Writing to the "console" 'tab-delimited'
# # two rows, five cols but the first row is 1 2 3 4 5
# write(x, "", sep = "\t")
# ************************************************************************
