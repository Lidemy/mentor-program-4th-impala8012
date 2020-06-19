## 挑戰題

```shell
if [ -z "$1" ];
then
  echo "please enter a number"
else
  for((i = 1; i <= $1; i++))
    do
      touch ${i}.js
    done
  echo "file created"
fi

# 附註:
# -z "字串" => 判斷字串長度是否為0
# -n "字串" => 判斷字串長度是否非0
# 判斷式中括號內前後都要空格，if和elif需要分號;
```
