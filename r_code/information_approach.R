# load data first
# load packages
library(snowfall)
library(stringr)
# in the dataset we have two matrices q1 and q1N (cases and controls)
# Case jedna Plec, control druga Plec


q1 <- read.csv("male.csv")
q1N <- read.csv("female.csv")


#q1 <- t(q1)
#q1N <- t(q1N)

iii=4 # select sample from the cases set - numer probki która odrozniamy od kontroli

k=30 # number of features selected each time
nn=150 # total number of features - ilosc kolumn w macierzy
set.seed(1) # set random seed
alfa=0.5 # select parameter for Renyi divergence (0,2), problem jak alfa = 1
## define function which returns the sample importance score in a given subset
f.control.leave1out<-function(z,ii=iii){ # ii is the sample number and z is the selected subset
  iind(rbind(q1[ii,z],q1N[,z]))-iind(q1N[,z])- sapply(1:length(z),function(x){iind(rbind(q1[ii,z[-x]],q1N[,z[-x]]))-iind(q1N[,z[-x]])})
}
##
sfInit(cpus=16,parallel=T) # initialize cluster for computation
sfExport('iii','iind','f.control.leave1out','q1','q1N', 'nn', 'k', local=F) # export variables to elements of the cluster
## start actual stuff here
sfSapply(1:1000,function(y){
  probne.cechy1<-sample(1:nn,k) # select a subset of features
  tryCatch(f.control.leave1out(probne.cechy1),error=function(e) rep(NA,k))->wyniki # compute score
  cbind(probne.cechy1,wyniki)}
) -> wynik.control.rf # bind scores vector with feature numbers to return
sfStop() # stop cluster
save(wynik.control.rf,file=str_c('Immunome',iii,'.RData')) # save binary file

## function to compute the I-index of order alpha
iind<-function(x,p=1/2){ # here x is the matrix of observations
  x<-x[apply(x,1,sum)>0,]
  x<-x/sum(x)
  m1<-apply(x,1,sum)
  m2<-apply(x,2,sum)
  ou<-outer(m1,m2)
  1/(p-1)*log(sum(x^p/ou^(p-1)))/(1/(p-1)*log(sum(m2^(2-p))))
}


## collect median importance scores
list.files(pattern='Immunome')->pliki # list files with results for each case sample
k=30 # number of features selected in each subset (size of subset)
nn=150 # total number of features
lista.per.pacjent<-list() # define output
load(pliki[1]) # load first file with results
lapply(1:nn,function(x) unlist(sapply(1:k,function(y) wynik.control.rf[y+k,wynik.control.rf[y,]==x])))->lista.per.pacjent[[1]] # collect scores for each feature
for(i in 2:length(pliki)){load(pliki[i]); # loop over files for each sample
  lapply(1:nn,function(x) unlist(sapply(1:k,function(y) wynik.control.rf[y+k,wynik.control.rf[y,]==x])))->lista.per.pacjent[[i]]} # end loop
sapply(lista.per.pacjent,function(y) sapply(y,function(x) median(x,na.rm=T)))->macierz.per.pacjent # collect median of each feature/sample combination
save(macierz.per.pacjent,file='MacierzWynik1.RData') # save results in binary file