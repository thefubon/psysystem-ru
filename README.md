# 👨‍💻 Как правильно деплоить сайт?

```ssh
cd /var/www/www-root/data/www/psysystem.ru
```

### Установка GIT

```ssh
sudo apt update
sudo apt install git
```

### Настройка git

https://www.youtube.com/watch?v=i-T5rJ1WkOI&t=2s

```
git config --global user.name "thefubon"
git config --global user.email "thefubon@gmail.com"
```

### После клонируем проект с GitHub и стандартные команды

https://github.com/settings/tokens

```ssh
git clone 'https://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@github.com/thefubon/psysystem-ru.git'
```

В туже папку

```ssh
git clone https://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@github.com/thefubon/psysystem-ru.git ./
```

Из GitHub На сервер

```ssh
git reset --hard
git pull

Скорее всего, правильным решением в данном случае будет:
git fetch --all
git reset --hard origin/main
```
