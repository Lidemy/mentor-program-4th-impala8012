## 超級挑戰題

```shell
echo `curl https://api.github.com/users/$1 --silent | grep "name" | cut -d '"' -f 4 `
echo `curl https://api.github.com/users/$1 --silent | grep "bio" | awk 'BEGIN {FS=":"}; {print $2}' | cut -d '"' -f 2`
echo `curl https://api.github.com/users/$1 --silent | grep "location" | awk 'BEGIN {FS=":"}; {print $2}' | sed 's/",//' | sed 's/"//'`
echo `curl https://api.github.com/users/$1 --silent | grep "blog" | awk -F '"' '{print $4} '`

```
