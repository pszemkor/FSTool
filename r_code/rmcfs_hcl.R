library('rmcfs')
library(dplyr) 
library('Jmisc')
library(data.table)

cases1 <- fix.data(as.data.frame(cases))
cases1 <- addCol(cases1, patient="case")

controls1 <- fix.data(as.data.frame(controls))
controls1 <- addCol(controls1, patient="control")

hcl_data <- rbind(controls1,cases1)

class(hcl_data)

labels <- hcl_data["patient"]

result <- mcfs(patient~., hcl_data, cutoffPermutations = 200, seed = 1, threadsNumber = 16)

## plot convergence statistics
plot(result, type = "distances")

## review cutoff values
result$cutoff
result$cutoff_value

## plot RI values in decreasing order and show max RI values
plot(result, type = "ri", size = 50, plot_permutations = TRUE)

## plot 50 strongest ID (feature interdependencies)
plot(result, type = "id", size = 50)

## plot top 10 attributes and their RI as vertical bars
plot(result, type = "features", size = 10)

## review ID-Graph
gid <- build.idgraph(result)
plot(gid, label_dist = 1)

## review ID-Graph for 6 top features and 12 top ID
gid <- build.idgraph(result, size = 6, size_ID = 12)
plot(gid, label_dist = 0.9)

## plot result of cross-validation
plot(result, type = "cv", measure = "wacc")