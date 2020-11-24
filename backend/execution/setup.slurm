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

unset PYTHONPATH

module load plgrid/tools/python/3.6.5
module load plgrid/apps/r/3.6.0

python3 -m virtualenv ~/fstool-env
source ~/fstool-env/bin/activate

echo 1
pip3 install numpy pandas matplotlib seaborn scikit-learn networkx pyarrow fastparquet rpy2 pandarallel
echo 2

exit 0