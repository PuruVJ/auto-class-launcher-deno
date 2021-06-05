deno compile --allow-all --unstable --target aarch64-apple-darwin --output ./bin/class-launcher-apple-m1 index.ts
deno compile --allow-all --unstable --target x86_64-apple-darwin --output ./bin/class-launcher-apple-intel index.ts 
deno compile --allow-all --unstable --target x86_64-pc-windows-msvc --output ./bin/class-launcher-windows index.ts 
deno compile --allow-all --unstable --target x86_64-unknown-linux-gnu --output ./bin/class-launcher-linux index.ts 
