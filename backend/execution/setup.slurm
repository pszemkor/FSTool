#!/bin/bash
#SBATCH --partition plgrid-short
#SBATCH --nodes 1
#SBATCH --ntasks-per-node 6
#SBATCH --time 1:00:00
#SBATCH --output setup_log.txt
#SBATCH -A {0}

if [ -d ~/fstool-env/ ]; then
    rm -r ~/fstool-env/;
fi
python3 -m virtualenv ~/fstool-env
unset PYTHONPATH
module load plgrid/tools/python/3.6.5

module load plgrid/apps/r/3.6.0
source ~/fstool-env/bin/activate
echo 5
LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/net/software/local/software/Java/1.8.0_60/jre/lib/amd64/server
R CMD javareconf -e > /dev/null 2>&1
echo 6
pip3 install numpy pandas matplotlib seaborn scikit-learn networkx pyarrow fastparquet rpy2
echo 7

exit 0