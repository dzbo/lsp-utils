typechainDependencies=""

# check the dependencies of utils
# if dependency will have its tests run, then run the tests for the unchanged util as well
for utilPath in src/**/*.ts;
do
    # if util is `index.ts` skip to the next element
    if [ $utilPath == "src/index.ts" ] || [ $utilPath == "src/constants/index.ts" ];
    then
        continue
    fi;

    # ignore src/typechain/ folder
    if [[ $utilPath == src/typechain/* ]];
    then
        continue
    fi;

    # cache util file name
    ## remove the shortest string from left to right which ends in "/"
    utilName=${utilPath#*/}
    ## remove the longest string from right to left which starts with "."
    utilName=${utilName%%.*}

    # get the imports of the util
    imports=$(grep "^import" $utilPath)

    index=1;
    # read each line from `imports`
    while read line; do 
        # remove the longest string from left to right which ends in "from "
        dependency=${line##*"from "}
        # remove the shortest string from left to right which ends in "'"
        dependency=${dependency#*\'}
        # remove the shortest string from right to left which satrts with "'"
        dependency=${dependency%\'*}

        # check if dependency starts with './' or '../', which means it is from 'src/'
        if [[ $dependency == ../typechain* ]];
        then
            # remove the shortest string from left to right which ends in "{"
            importedContracts=${line#*"{"}
            # remove the shortest string from right to left which satrts with "}"
            importedContracts=${importedContracts%"}"*}
            # clear the whitespaces
            importedContracts=$(echo $importedContracts | sed 's/ //g')

            # check if there are multiple imported contracts or signgle
            if [[ $importedContracts == *,* ]];
            then
                # transform the imported contracts to an array
                IFS="," read -a contractNames <<< $importedContracts

                # loop through the imported contracts
                for contractName in $contractNames
                do
                    # if the contract ends with "__factory"
                    if [[ $contractName == *__factory ]];
                    then
                        # remove the shortest string from right to left which ends in "__factory"
                        contractName=${contractName%"__factory"*}

                        # check if typechain dependency is present
                        # add it if its not
                        if [[ $typechainDependencies != *$contractName* ]];
                        then
                            typechainDependencies+=" $contractName"
                        fi;
                    else
                        # check if typechain dependency is present
                        # add it if its not
                        if [[ $typechainDependencies != *$contractName* ]];
                        then
                            typechainDependencies+=" $contractName"
                        fi;
                    fi;
                done
            else
                # at this point we assume its a signle imported contract
                contractName=$importedContracts
                # if the contract ends with "__factory"
                if [[ $contractName == *__factory ]];
                then
                    # remove the shortest string from right to left which ends in "__factory"
                    contractName=${contractName%"__factory"*}

                    # check if typechain dependency is present
                    # add it if its not
                    if [[ $typechainDependencies != *$contractName* ]];
                    then
                        typechainDependencies+=" $contractName"
                    fi;
                else
                    # check if typechain dependency is present
                    # add it if its not
                    if [[ $typechainDependencies != *$contractName* ]];
                    then
                        typechainDependencies+=" $contractName"
                    fi;
                fi;
            fi;
        fi;
        index=$(($index+1)); 
    done <<< "$imports"
done

typechainCommand="npx typechain --target=ethers-v6 --out-dir src/typechain"
for contractName in $typechainDependencies
do
    if [[ $contractName == ERC725* ]];
    then
        typechainCommand+=" ./node_modules/@erc725/smart-contracts/artifacts/$contractName.json"
    else
        typechainCommand+=" ./node_modules/@lukso/lsp-smart-contracts/artifacts/$contractName.json"
    fi;
done
$typechainCommand