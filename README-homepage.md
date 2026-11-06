# 李易聪 / Yicong Li 学术主页

纯静态网页，直接用于 yl3800.github.io，无需构建、后台或付费服务。

## 内容维护
- index.html：个人简介、研究方向、教育背景与联系方式。中英文文本成对保存在 data-en / data-zh 中。
- assets/content.js：公开项目、论文、作者与链接。未公开稿件不在本版本中。
- assets/site.css：布局和配色。
- assets/site.js：中英文切换（自动记住选择）、论文分类、BibTeX对话框和复制。

## GitHub Pages
将 index.html、assets/ 和 .nojekyll 放在原仓库 master 分支根目录，保留原 image/ 文件夹。Settings → Pages 的来源保持 master / root。无需添加Actions权限。
头像复用原仓库 image/profile.JPG 的原始文件，保存为 assets/profile.jpg，不依赖外部图片请求。
旧 research.html、publications.html 及其资源仍保留，可继续通过原地址访问。

## 本地预览
在本目录运行 python3 -m http.server 8765，再访问 http://localhost:8765。

## 依据和待完善项
- 姓名、学校及研究方向：用户确认及本次会话材料。
- 头像、邮箱、Google Scholar、教育背景、荣誉：原公开主页。
- 参考布局：https://anzhang314.github.io/index.html。本实现为独立编写，无复用对方正文、CSS、照片或品牌。
- reAR：https://arxiv.org/abs/2510.04450
- VINCIE：https://arxiv.org/abs/2506.10941
- VA-π：https://arxiv.org/abs/2512.19680
- EgoTwin：https://arxiv.org/abs/2508.13013
- 新论文的会议标签采用公开来源可确认的状态；其余标为预印本，不根据本地文件名推断录用状态。
- 实验室正式名称、最新职称、成员名单和招生政策未提供，因此未编造。
- 实验室研究方向包含后训练和智能体；未公开的具体项目与数字不上传公开仓库。
- 四张项目图为CSS方法示意，不是论文实验输出。

发布前建议确认教育背景的正式表述及是否更新联系邮箱。
