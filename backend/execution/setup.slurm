#!/bin/bash
#SBATCH --partition plgrid-short
#SBATCH --nodes 1
#SBATCH --ntasks-per-node 6
#SBATCH --time 1:00:00
#SBATCH --output setup_log.txt
#SBATCH -A {0}

python3 -m venv ~/fstool-env

unset PYTHONPATH
module load plgrid/tools/python/3.6.5
source ~/fstool-env/bin/activate

module load plgrid/apps/r/3.6.0
LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/net/software/local/software/Java/1.8.0_60/jre/lib/amd64/server
R CMD javareconf -e > /dev/null 2>&1

pip install numpy pandas matplotlib seaborn scikit-learn networkx pyarrow fastparquet rpy2

exit 0