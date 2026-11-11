# kun1983.com

Kun1983 的个人主页。纯静态 HTML / CSS / JavaScript，无构建步骤，通过 GitHub Pages 发布。

- 仓库：<https://github.com/kun1983/kun1983.github.io>
- 正式域名：<https://kun1983.com>
- Pages 工作流：`.github/workflows/pages.yml`

## 页面内容

- 首屏个人介绍：SONY 粉、PC 技术 Geek、PC DIY、音乐
- 微信公众号：`Kun1983` / `gh_208227c20fcc`
- 小红书：`Kun1983` / `893815528`
- 账号 ID 一键复制
- 浅色 / 深色主题切换（跟随系统，可手动覆盖并记忆）
- 响应式布局、减少动态效果支持、404 页面

## 本地预览

```powershell
python -m http.server 8787
```

打开 <http://127.0.0.1:8787/>。

## 替换二维码

把两张正方形二维码图片放到：

```text
assets/img/wechat-qr.png
assets/img/xiaohongshu-qr.png
```

建议尺寸至少 640 × 640，四周保留少量白边。图片存在并加载成功后，页面会自动用二维码替换占位图案，并把下方文案改为“扫码关注 / SCAN”；无需改代码。图片未放入时显示“二维码待补充”。

## 访问统计

站点使用 **Cloudflare Web Analytics**，无 Cookie，不采集个人身份信息。

- 首页和 404 页均已接入统计脚本
- 后台入口：<https://dash.cloudflare.com/?to=/:account/web-analytics>
- 进入 `kun1983.com` 站点后，可查看最近 24 小时、7 天、30 天的访问量、来源、热门页面和设备分布
- 首次接入后数据通常需要几分钟才会出现

> 广告拦截器、隐私插件会拦截统计脚本，因此数据反映的是成功加载统计脚本的真实浏览器访问，不能与服务器访问日志完全等同。

## 修改文案

- 个人介绍、账号信息：`index.html`
- 颜色、字体、布局：`assets/css/style.css`
- 主题切换、复制、二维码检测：`assets/js/main.js`

## 发布

仓库使用 GitHub Actions 部署。推送到 `main` 后，工作流 `.github/workflows/pages.yml` 会自动发布静态文件。

在仓库 **Settings → Pages** 中确认：

- **Build and deployment → Source** 为 `GitHub Actions`
- **Custom domain** 为 `kun1983.com`
- DNS 生效后勾选 **Enforce HTTPS**

## 自定义域名 DNS

在域名服务商处修改 `kun1983.com` 的解析。先删除与 GitHub Pages 冲突的旧 A / AAAA / CNAME 记录，再添加：

| 类型 | 主机记录 | 记录值 |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |
| CNAME | `www` | `kun1983.github.io` |

> 当前 `kun1983.com` 解析到 `106.186.17.53`。切换到 GitHub Pages 前请确认该地址上的旧站点不再使用。

DNS 生效后，在仓库 **Settings → Pages** 中设置 Custom domain 为 `kun1983.com`，等待证书签发，再启用 Enforce HTTPS。

## 文件结构

```text
.
├── index.html
├── 404.html
├── CNAME
├── site.webmanifest
├── robots.txt
├── sitemap.xml
├── .nojekyll
├── .github/workflows/pages.yml
└── assets
    ├── css/style.css
    ├── js/main.js
    └── img
        ├── favicon.svg
        ├── apple-touch-icon.png
        ├── icon-512.png
        ├── og-cover.png
        ├── wechat-qr.png        # 已放入
        └── xiaohongshu-qr.png   # 已放入
```
