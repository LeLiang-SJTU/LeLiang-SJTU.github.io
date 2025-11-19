source "https://rubygems.org"

# Add csv gem for Ruby 3.4+ compatibility
gem "csv"

# Add bigdecimal for Ruby 3.4+ compatibility  
gem "bigdecimal"

gem "jekyll", "~> 4.4.0"
gem "jekyll-feed", "~> 0.12"
gem "jekyll-sitemap"
gem "jekyll-seo-tag"
gem "jekyll-paginate"
gem "minima"

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.2.0", :platforms => [:mingw, :x64_mingw, :mswin]

# Lock `http_parser.rb` gem to `v0.6.x` on JRuby builds since newer versions of the gem
# do not have a Java counterpart.
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]

# Fix for google-protobuf dependency issue
gem "google-protobuf", "~> 3.0"