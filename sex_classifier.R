#!/usr/bin/env Rscript

library(rmcfs)
library(dplyr)
args = commandArgs(trailingOnly=TRUE)
path <- args[1]
label <- args[2]
print(path)
print("lalala")
#"C:\\Users\\Acer\\Desktop\\HCL Matched Normals 6.26.18.csv"
# label column name
df <- read.table(path, header = TRUE,sep = ",")

data <- select(df, -INITIALS)

result <- mcfs(SEX ~., data, cutoffPermutations =25, seed = 2,threadsNumber = 8)

plot(result, type = "distances")
plot(result, type = "ri", size = 50, plot_permutations = TRUE)
plot(result, type = "id", size = 50)
plot(result, type = "features", size = 10)
gid <- build.idgraph(result)
plot(gid, label_dist = 1)
gid <- build.idgraph(result, size = 6, size_ID = 12)
plot(gid, label_dist = 0.9)
plot(result, type = "cv", measure = "wacc")
print(result)

