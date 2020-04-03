import rf_sex_classifier

if __name__ == '__main__':
    print("Select algorithm: [mcfs, rf]")
    algo = input()
    print("Select training data path: ")
    path = input()
    print("Type target label")
    target = input()

    if algo == "rf":
        rf = rf_sex_classifier.RandomForest(path, target)
        rf.train_model()
        rf.show_importance()

    elif algo == "mcfs":
        # execute R script
        pass
    else:
        raise Exception("Unknown algorithm")
