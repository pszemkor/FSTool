#!/bin/bash
#SBATCH --partition plgrid-short
#SBATCH --nodes 1
#SBATCH --ntasks-per-node 6
#SBATCH --time 1:00:00
#SBATCH --output log.txt
#SBATCH -A plgimmunome

unset PYTHONPATH
module load plgrid/tools/python/3.6.5
source ~/python_env/bin/activate

python hello.py {0} {1} {2} {3} {4} {5}

exit 0