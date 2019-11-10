---
title: Hexo-Theme-Snail
catalog: true
comments: true
date: 2019-11-01 22:02:12
subtitle: A succinct hexo theme.
header-img: snail-bg.jpg
tags:
- dusign
- hexo-theme-snail
- snail
- hexo
catagories:
- dusign
- hexo-theme-snail
- snail
- hexo
---
# hexo-theme-snail
[View Hexo-Theme-Snail Sources On Github &#10174; ](https://github.com/dusign/hexo-theme-snail)

[View Live Super Snail Blog &#10174;](https://www.dusign.net)

![hexo-theme-snail](snail.png)

Hexo-theme-snail is a succinct hexo theme. It has two colors, light and star, that can be set according to your own preferences in the settings, and also has the functions of sharing and commenting. More features are under development.

## Features
- light color theme and star theme
- diversified comment system
- notice tips
- share to other platforms (under development)
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
$ rm _config.yml package.json README.md LICENSE
$ git clone https://github.com/dusign/hexo-theme-snail.git
$ mv ./hexo-theme-snail/snail ./themes
$ mv ./hexo-theme-snail/* ./
$ npm install
```
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
signature-img: img/signature/Just-do-it-white.png
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
- featured-tags
- short-about
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
### Comment
See httpymls://github.com/imsun/gitment for detailed configuration method.
```yml
# Comment
## This comment system is gitment
## gitment url: https://github.com/imsun/gitment
comment:
  enable: false
  owner:
  repo:
  client_id:
  client_secret:
```
### Tip
```yml
# Tip
tip:
  enable: true
  content: 欢迎访问 <a href="https://www.dusign.net" target="dusign">dusign</a> 的博客，博客系统一键分享的功能还在完善中，请大家耐心等待。
          若有问题或者有好的建议欢迎留言，笔者看到之后会及时回复。
          评论点赞需要github账号登录，如果没有账号的话请点击 
          <a href="https://github.com" target="view_window" > github </a> 注册， 谢谢 !
```
### Color Sheme
Set the `enable` value of the desired color sheme to `true`. If the value of `bg_effects.star.enable` is `true`, please modify the value of `highlight_theme` in `./themes/snail/_config.yml` to `night`.
```yml
# Color Sheme
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
    content: '"🌱","just do it","🌾","🍀","don''t give up","🍂","🌻","try it again","🍃","never say die","🌵","🌿","🌴"'
    color: '"rgb(121,93,179)"
          ,"rgb(76,180,231)"
          ,"rgb(184,90,154)"
          ,"rgb(157,211,250)"
          ,"rgb(255,0,0)"
          ,"rgb(242,153,29)"
          ,"rgb(23,204,16)"
          ,"rgb(222,0,0)"
          ,"rgb(22,36,92)"
          ,"rgb(127,24,116)"
          ,"rgb(119,195,79)"
          ,"rgb(4,77,34)"
          ,"rgb(122,2,60)"'
  star:
    enable: true
```

## Releases
V1.0
- fix the bugs
- add comment system
- add notice tips
- add star sheme

## License
Apache License 2.0 Copyright(c) 2018-2020 [Dusign](https://github.com/dusign)   

[hexo-theme-snail](https://github.com/dusign/hexo-theme-snail) is derived from [Huxpro](https://github.com/Huxpro/huxpro.github.io) Apache License 2.0. Copyright (c) 2015-2020 Huxpro
