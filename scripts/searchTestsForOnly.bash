invalidTests=""
for test in tests/**/*.ts
do
    if grep -q describe.only "$test" ||
       grep -q it.only "$test";
    then
        invalidTests+="$test "
    fi
done
if [[ $invalidTests != "" ]];
then
    echo "Some files have '.only'. Please remove before commiting."
    
    for test in $invalidTests
    do
        echo "'$test'"    
    done

    exit 1
fi;