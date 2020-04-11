# hexo-theme-snail
[View Live Super Snail Blog →](https://www.dusign.net)

**Light theme preview**

![hexo-theme-snail](snail-light.png)

**Dark theme preview**

![hexo-theme-snail](snail-dark.png)

**Star theme preview**

![hexo-theme-snail](snail-star.png)

Hexo-theme-snail is a succinct hexo theme. It has two colors, light and star, that can be set according to your own preferences in the settings, and also has the functions of sharing and commenting. More features are under development.

## Features
- light color theme and star theme
- diversified comment system
- notice tips
- sharing to other platforms (under development)
- picture sharing (under development)

## Quick Start
### Install Hexo
```bash
$ npm install hexo-cli -g
```

### Setup your blog
```bash
$ hexo init blog
```

### Installation Theme
```bash
$ cd blog
$ rm -rf source
$ rm -rf scaffolds
$ rm _config.yml package.json README.md LICENSE
$ git clone https://github.com/dusign/hexo-theme-snail.git
$ mv ./hexo-theme-snail/snail ./themes
$ mv ./hexo-theme-snail/* ./
$ npm install
```

### Install Mathjax
To install Mathjax, please click https://www.dusign.net/2019/10/14/Hexo-Configuration/ for a detailed tutorial.

### Install WordCount
```
npm install hexo-wordcount --save
```
See https://github.com/willin/hexo-wordcount for detailed configuration method.

### Set Theme
Modify the value of `theme:` in `_config.yml`
```yml
# Extensions
## Plugins: https://hexo.io/plugins/
## Themes: https://hexo.io/themes/
theme: snail
```

### Start the Server
```bash
$ hexo generate
$ hexo server
```

## Configuration
### Site
Replace the following information with your own.
```yml
# Site
title: 
subtitle: At the bottom of the well, it is destined to see only the sky at the wellhead. 
          However, the starting point only affects the process of reaching your peak and does not determine the height you reach.
author: Dusign
language: en
timezone:
```

### Site Settings
Put customized pictures in `img` directory.
```yml
# Site settings
SEOTitle: Hexo-theme-snail
email: hexo-theme-snail@mail.com
description: "A hexo theme"
keyword: "dusign, hexo-theme-snail"
header-img: img/header_img/home-bg-1-dark.jpg
signature: true #show signature
signature-img: img/signature/dusign.png
```

### SNS Settings
If you don't want to display it, you can delete it directly.
```yml
# SNS settings
github_username:    dusign
twitter_username:   dusignr
facebook_username:  Gang Du
zhihu_username: dusignr
```

### Sidebar Settings
```yml
# Sidebar Settings
sidebar: true                      # whether or not using Sidebar.
sidebar-about-description: "Welcome to visit, I'm Dusign!"
sidebar-avatar: img/ironman-draw.png      # use absolute URL, seeing it's used in both `/` and `/about/`
widgets:
- search
- featured-tags
- short-about
- visitor
- recent-posts
- friends-blog
- archive
- category

# widget behavior
## Archive
archive_type: 'monthly'
show_count: true


## Featured Tags
featured-tags: true                     # whether or not using Feature-Tags
featured-condition-size: 1              # A tag will be featured if the size of it is more than this condition value


## Friends
friends: [
    {
        title: "Dusign's Blog",
        href: "https://blog.csdn.net/d_Nail"
    },{
        title: "Dusign's Web",
        href: "#"
    },{
        title: "Dusign's Github",
        href: "https://github.com/dusign"
    },{
        title: "Other",
        href: "#"
    }
]
```

### Theme
```yml
# Extensions
## Plugins: https://hexo.io/plugins/
## Themes: https://hexo.io/themes/
theme: snail
```

### Deployment
```yml
# Deployment
## Docs: https://hexo.io/docs/deployment.html
deploy:
  type: git
  repo:
      github: github.repository.address
      coding: coding.repository.address
  branch: master
```

### Share
```yml
## Share
share: true
```

### Comment
See https://github.com/imsun/gitment for detailed configuration method.
```yml
# Comment
## This comment system is gitment
## gitment url: https://github.com/imsun/gitment
comment:
  gitment:
    enable: false
    owner:
    repo:
    client_id:
    client_secret:
  livere:
    enable: false
  disqus:
    enable: false
    username:
```

### Tip
```yml
# Tip
tip:
  enable: true
  copyright: This is copyright.
  content: false
```

### Background effects
Set the `enable` value of the desired color sheme to `true`. If the value of `bg_effects.star.enable` is `true`, please modify the value of `highlight_theme` in `./themes/snail/_config.yml` to `night`.
```yml
# Background effects
## If there is no effect after modification, please empty the cache and try again.
## ⚠️ The following special effects will take up a lot of cpu resorces, please open it carefully.
bg_effects:
  enable: true
  line:
    enable: false
    color: 129,200,61
    pointColor: 129,200,61
    opacity: 0.7
    zIndex: -9
    count: 99
  mouse_click:
    enable: true
    content: '"🌱","just do it","🍀"'
    color: '"rgb(121,93,179)"
          ,"rgb(76,180,231)"
          ,"rgb(184,90,154)"'
  wave:
    enable: true
```

### Visitor statistics
```yml
# Visitor statistics
visitor:
  enable: true
  type: 
```

### Color Theme
```
# Color Theme
## light , dark or star
## If you set the value of the `color_theme` to `dark`, set the value of the `highlight_theme` to `night` in `/theme/snail/config.yml`
## `mouse_control` is only valid for star themes
color_theme: light
mouse_control: false
```

### Search
run `$ npm install hexo-generator-search --save`
then add the follow configure to `_config.yml`
```yml
## Search
search:
  enable: true
  path: search.xml
  field: post
  content: true
```
- path - file path. By default is search.xml . If the file extension is .json, the output format will be JSON. Otherwise XML format file will be exported.
- field - the search scope you want to search, you can chose:
  - post (Default) - will only covers all the posts of your blog.
  - page - will only covers all the pages of your blog.
  - all - will covers all the posts and pages of your blog.
- content - whether contains the whole content of each article. If false, the generated results only cover title and other meta info without mainbody. By default is true.

### Error and Solutions
- run `hexo deploy` with "ERROR Deployer not found: git"
solution: `npm install --save hexo-deployer-git`

### Top
Hexo-theme-snail has added the article top function, just add the following content in the article head.
```yml
top: true
```

## Releases
v1.4
- hide sidebar when *toc* is empty
- change the music library to NetEase music library
- add a function that can stop *toc* automatic numbering

v1.3
- fix *category* jump path issue in sidebar
- add a default image for new articles
- add *photography* (under development)
- fix *top* and *page* conflict

v1.2
- fix the bug
- add *search* within site
- add *top*
- image wave effect
- add *share*
- add dark theme

v1.1
- change title font-family
- add *wordcount*
- add visitor statistics
- fix the bug (*categories* not display)
- replacing mathjax with marked

v1.0
- fix the bugs
- add comment system
- add notice tips
- add star theme
- add line theme (background effect)
- add mouse-click effect

## License
Apache License 2.0 Copyright(c) 2018-2020 [dusign](https://github.com/dusign)   
[hexo-theme-snail](https://github.com/dusign/hexo-theme-snail) is derived from [hexo-theme-beantech](https://github.com/YenYuHsuan/hexo-theme-beantech) ，thanks [YenYuHsuan](https://github.com/YenYuHsuan).
