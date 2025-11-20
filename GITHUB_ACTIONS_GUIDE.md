# GitHub Actions 检查和渲染问题排查指南

## 🔍 如何查看 GitHub Actions 状态

### 1. 查看 Actions 执行状态
1. 进入你的 GitHub 仓库
2. 点击顶部的 **"Actions"** 标签页
3. 查看最新的 **"Build and Deploy Jekyll Site"** 工作流
4. 点击具体的工作流运行查看详细日志

### 2. 关键检查点
在 Actions 日志中，重点关注以下步骤：

#### ✅ 应该看到的成功步骤：
- **Setup Ruby** - Ruby 环境设置成功
- **Install dependencies** - 依赖安装成功
- **Show Jekyll version** - 显示 Jekyll 版本信息
- **Show Jekyll configuration** - `jekyll doctor` 检查通过
- **Build site** - 网站构建成功
- **List generated files** - 生成的文件列表
- **Deploy to GitHub Pages** - 部署成功

#### ⚠️ 需要关注的警告：
- Sass 弃用警告（可忽略，不影响功能）
- 任何 ERROR 或 FAILED 状态

## 🛠️ 渲染不一致的可能原因和解决方案

### 1. **重复文件问题** ✅ 已解决
**问题：** 多个相同名称的 post 文件导致 Jekyll 构建冲突
**解决：** 已删除所有重复的 copy 文件

### 2. **Kramdown 配置不一致** ✅ 已解决
**问题：** 本地和部署环境的 Markdown 解析器配置不同
**解决：** 添加了详细的 kramdown 配置：
```yaml
kramdown:
  input: GFM                    # 使用 GitHub Flavored Markdown
  syntax_highlighter: rouge      # 语法高亮
  hard_wrap: false               # 软换行
  smart_quotes: lsquo,rsquo,ldquo,rdquo  # 智能引号
```

### 3. **字符编码问题**
**检查：** 确保 Markdown 文件使用 UTF-8 编码
**解决：** 在文件头部添加编码声明（如果需要）

### 4. **插件版本差异**
**检查：** GitHub Actions 使用的是 Gemfile 中指定的版本
**解决：** 已锁定所有插件版本确保一致性

## 🔧 调试步骤

### 如果部署后仍有渲染问题：

1. **检查 Actions 日志**
   - 查看 "Build site" 步骤的详细输出
   - 检查是否有任何警告或错误

2. **比较生成的 HTML**
   ```bash
   # 本地生成
   bundle exec jekyll build
   
   # 比较本地和远程的特定文件
   diff _site/随笔/2025/11/19/Markdown-全格式详解与实例演示.html \
        (从 GitHub Pages 下载的对应文件)
   ```

3. **检查文件路径**
   - 中文分类名是否正确转换为 URL
   - 文件名中的特殊字符处理

4. **验证 Markdown 语法**
   - 使用在线 Markdown 验证器检查语法
   - 确保代码块格式正确

## 📋 部署前检查清单

### ✅ 已完成的优化：
- [x] 清理重复的 post 文件
- [x] 添加详细的 kramdown 配置
- [x] 优化 GitHub Actions 配置，添加详细日志
- [x] 本地构建测试通过
- [x] Jekyll doctor 检查通过

### 🚀 下一步操作：
1. 提交所有更改到 GitHub
2. 等待 GitHub Actions 自动执行
3. 检查 Actions 日志确认构建成功
4. 访问部署的网站验证渲染效果

## 🆘 常见问题解决

### Q: Actions 构建成功但渲染仍然不同
**A:** 检查浏览器缓存，尝试强制刷新（Ctrl+F5）

### Q: 中文分类显示异常
**A:** 查看 Actions 日志中的 "Check specific post file" 步骤

### Q: 代码高亮不工作
**A:** 确认代码块语言标识符正确，检查 kramdown 配置

---

**重要提醒：** 每次修改配置后，都需要等待 GitHub Actions 重新构建和部署才能看到效果。构建通常需要 2-5 分钟完成。