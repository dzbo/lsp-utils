for utilPath in src/***/**/*.ts;
do
    # ignore src/***/**/*.test.ts
    if [[ $utilPath == *.test.ts ]];
    then
        continue
    fi;

    # ignore src/***/**/index.ts
    if [[ $utilPath == *index.ts ]];
    then
        continue
    fi;

    # ignore src/***/**/index.ts
    if [[ $utilPath == src/typechain/* ]];
    then
        continue
    fi;

    # generate the `testPath` from `utilPath`
    ## remove the longest string from right to left
    ## which starts with "."
    testPath=${utilPath%%.*}.test.ts

    if [ ! -f "$testPath" ];
    then
        echo "The file \`$utilPath\` does not have any tests. Please add tests for the features and functions in this file."
        exit 1
    fi
done
