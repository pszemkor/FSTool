#!/bin/bash
#SBATCH --partition plgrid
#SBATCH --nodes 1
#SBATCH --ntasks-per-node 24
#SBATCH --time 72:00:00
#SBATCH --output log-%J.txt
#SBATCH -A {3}

unset PYTHONPATH
module load plgrid/tools/python/3.8
source ~/fstool-env/bin/activate

module load plgrid/apps/r/3.6.0
LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/net/software/local/software/Java/1.8.0_60/jre/lib/amd64/server
R CMD javareconf -e
pip install rpy2

python fstool.py {0} {1} {2}

exit 0