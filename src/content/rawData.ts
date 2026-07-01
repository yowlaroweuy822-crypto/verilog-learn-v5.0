import type {
  BugCase,
  Exercise,
  LearningSection,
  ProjectStep,
  ReferenceTab,
  TutorialSection,
  TutorialChapter,
  WaveformCase,
} from '../types';

export const SECTIONS: ReadonlyArray<{ id: LearningSection; label: string }> = [
  {id:'home',label:'🏠 首页'},
  {id:'tutorial',label:'📚 系统教程'},
  {id:'micro',label:'✏️ 微练习'},
  {id:'exercise',label:'🎯 综合练习'},
  {id:'bug',label:'🐛 Bug Hunt'},
  {id:'waveform',label:'📊 波形阅读'},
  {id:'project',label:'🚀 项目实战'},
  {id:'reference',label:'📖 语法速查'},
  {id:'playground',label:'💻 代码练习场'}
];

/* ---------- TUTORIALS (20 chapters) ---------- */
export const TUTORIALS = [
  {id:'ch1',icon:'📘',title:'第一章：认识 Verilog 与第一个模块',desc:'理解硬件描述语言的本质，写出你的第一个模块',
   sections:[
    {title:'1.1 什么是 Verilog？为什么要学它？',html:`
<p>Verilog 是一种<strong>硬件描述语言</strong>（HDL），诞生于 1984 年，后成为 IEEE 标准（IEEE 1364）。它不是像 C/Python 那样顺序执行的编程语言，而是用来<strong>描述数字电路的结构和行为</strong>。</p>
<p>使用 Verilog，你可以在不同抽象层次上描述电路：</p>
<table><tr><th>抽象层次</th><th>描述方式</th><th>典型用途</th></tr>
<tr><td>开关级</td><td>描述晶体管连接</td><td>底层标准单元库</td></tr>
<tr><td>门级</td><td>用 and/or/not 描述</td><td>小规模电路</td></tr>
<tr><td>数据流级</td><td>assign 连续赋值</td><td>组合逻辑</td></tr>
<tr><td>行为级</td><td>always/initial</td><td>时序逻辑、FSM</td></tr></table>
<div class="callout info"><span class="ct">💡 核心思维转变</span>写 C 代码时你是在给 CPU 下"指令"，指令顺序执行；写 Verilog 时你是在"画电路"，所有 assign、always 块在硬件中是<strong>并行</strong>工作的。这是初学者最需要建立的思维。</div>`},
    {title:'1.2 Verilog 在数字芯片设计流程中的位置',html:`
<p>典型的数字芯片设计流程如下：</p>
<div class="ex-svg"><svg viewBox="0 0 640 160" width="640" height="160" xmlns="http://www.w3.org/2000/svg" style="font-family:var(--font);font-size:11px">
  <defs><marker id="arr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><polygon points="0 0,8 4,0 8" fill="#57606a"/></marker></defs>
  <g>
    <rect x="10" y="50" width="90" height="60" rx="8" fill="#ddf4ff" stroke="#54aeff"/><text x="55" y="78" text-anchor="middle" font-weight="600" fill="#0969da">规格定义</text><text x="55" y="95" text-anchor="middle" fill="#57606a">Spec</text>
    <line x1="100" y1="80" x2="125" y2="80" stroke="#57606a" stroke-width="1.5" marker-end="url(#arr)"/>
    <rect x="125" y="50" width="90" height="60" rx="8" fill="#dafbe1" stroke="#4ac26b"/><text x="170" y="78" text-anchor="middle" font-weight="600" fill="#1a7f37">RTL 编码</text><text x="170" y="95" text-anchor="middle" fill="#57606a">Verilog</text>
    <line x1="215" y1="80" x2="240" y2="80" stroke="#57606a" stroke-width="1.5" marker-end="url(#arr)"/>
    <rect x="240" y="50" width="90" height="60" rx="8" fill="#fff8c5" stroke="#d4a72c"/><text x="285" y="78" text-anchor="middle" font-weight="600" fill="#9a6700">功能仿真</text><text x="285" y="95" text-anchor="middle" fill="#57606a">Simulation</text>
    <line x1="330" y1="80" x2="355" y2="80" stroke="#57606a" stroke-width="1.5" marker-end="url(#arr)"/>
    <rect x="355" y="50" width="90" height="60" rx="8" fill="#fbefff" stroke="#b780f5"/><text x="400" y="78" text-anchor="middle" font-weight="600" fill="#8250df">逻辑综合</text><text x="400" y="95" text-anchor="middle" fill="#57606a">Synthesis</text>
    <line x1="445" y1="80" x2="470" y2="80" stroke="#57606a" stroke-width="1.5" marker-end="url(#arr)"/>
    <rect x="470" y="50" width="90" height="60" rx="8" fill="#ffebe9" stroke="#f85149"/><text x="515" y="78" text-anchor="middle" font-weight="600" fill="#cf222e">布局布线</text><text x="515" y="95" text-anchor="middle" fill="#57606a">P&R</text>
    <line x1="560" y1="80" x2="585" y2="80" stroke="#57606a" stroke-width="1.5" marker-end="url(#arr)"/>
    <rect x="585" y="50" width="50" height="60" rx="8" fill="#f6f8fa" stroke="#d0d7de"/><text x="610" y="85" text-anchor="middle" font-weight="600">流片</text>
  </g>
</svg></div>
<p>你在本课程中学的 Verilog 编码，主要处于"RTL 编码"阶段。但你的代码会经过综合工具变成真实的门电路，所以<strong>脑子里必须始终有电路</strong>。</p>`},
    {title:'1.3 Verilog 代码的基本框架：module',html:`
<p>Verilog 的基本设计单元是<strong>模块（module）</strong>。一个模块描述一个电路块，有输入端口和输出端口，内部是电路的实现。</p>
<pre><code>module 模块名(
    input  wire 端口1,
    input  wire 端口2,
    output wire 端口3
);
    // 内部实现
    assign 端口3 = 端口1 & 端口2;
endmodule</code></pre>
<div class="keypoint"><div class="kp-t">⭐ 黄金法则</div><p>每个 module 从 <code>module</code> 开始，以 <code>endmodule</code> 结束。模块名、端口名是你自己起的，就像给一块电路板起名字、定义引脚一样。</p></div>`},
    {title:'1.4 第一个例子：二输入与门',html:`
<p>我们来实现一个最简单的电路：二输入 AND（与门）。</p>
<div class="ex-svg"><svg viewBox="0 0 280 100" width="280" height="100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="20" cy="35" r="3" fill="#1f2328"/><text x="10" y="39" font-size="12">a</text>
  <line x1="22" y1="35" x2="60" y2="35" stroke="#1f2328" stroke-width="1.5"/>
  <circle cx="20" cy="65" r="3" fill="#1f2328"/><text x="10" y="69" font-size="12">b</text>
  <line x1="22" y1="65" x2="60" y2="65" stroke="#1f2328" stroke-width="1.5"/>
  <path d="M60 20 L60 80 Q100 80 130 50 Q100 20 60 20 Z" fill="#ddf4ff" stroke="#0969da" stroke-width="1.5"/>
  <text x="85" y="54" font-size="13" font-weight="600" fill="#0969da">&amp;</text>
  <line x1="130" y1="50" x2="170" y2="50" stroke="#1f2328" stroke-width="1.5"/>
  <circle cx="170" cy="50" r="3" fill="#1f2328"/><text x="178" y="54" font-size="12">y</text>
</svg></div>
<pre><code>module and_gate(
    input  wire a,
    input  wire b,
    output wire y
);
    assign y = a & b;   // & 是按位与
endmodule</code></pre>
<p>这段代码描述的电路就是：有两个输入 a、b，一个输出 y；y 等于 a AND b。就这么简单。</p>`},
    {title:'1.5 编写你的第一个 Testbench',html:`
<p>Testbench（测试台）是用来验证你的模块是否正确的另一段 Verilog 代码。它不被综合成电路，只在仿真时使用。</p>
<pre><code>\`timescale 1ns/1ps
module and_gate_tb;
    reg a, b;    // testbench 里驱动输入用 reg
    wire y;      // 接被测模块的输出用 wire

    // 实例化被测模块
    and_gate uut(.a(a), .b(b), .y(y));

    initial begin
        // 给输入不同组合，观察输出
        a=0; b=0; #10;
        a=0; b=1; #10;
        a=1; b=0; #10;
        a=1; b=1; #10;
        $finish;
    end
endmodule</code></pre>
<div class="callout tip"><span class="ct">🎯 学习目标</span>学完本章，你应该能：①理解 Verilog 描述的是并行电路；②写出完整的 module 框架；③读懂简单的 Testbench 结构。</div>`}
   ]},
  {id:'ch2',icon:'📊',title:'第二章：数据类型与常量',desc:'wire、reg、四值逻辑、向量、参数——Verilog 世界的基本砖块',
   sections:[
    {title:'2.1 线网类型 wire',html:`
<p><code>wire</code> 是 Verilog 中最常见的数据类型，代表<strong>物理连线</strong>。它不能存储值，必须被连续赋值（assign）或模块输出驱动。</p>
<pre><code>wire a;        // 1位 wire
wire [7:0] d;  // 8位 wire（向量），d[7]是最高位</code></pre>
<div class="callout warn"><span class="ct">⚠️ 注意</span>wire 没有记忆功能。如果一个 wire 没有被任何东西驱动，它的值是 <code>z</code>（高阻），而不是 0。</div>`},
    {title:'2.2 寄存器类型 reg',html:`
<p><code>reg</code> 并不一定对应真实的寄存器（触发器）！它是 Verilog 过程块（always/initial）中用来<strong>存储赋值</strong>的变量类型。</p>
<ul>
<li>在组合 always 块中，reg 综合后是<strong>组合逻辑</strong>（导线）</li>
<li>在时序 always 块（带 posedge clk）中，reg 综合后才是<strong>触发器</strong></li>
</ul>
<pre><code>reg q;              // 1位 reg
reg [3:0] cnt;      // 4位 reg</code></pre>`},
    {title:'2.3 四种逻辑值',html:`
<p>Verilog 有四种逻辑值，这比普通编程语言多两种：</p>
<table><tr><th>值</th><th>含义</th><th>物理意义</th></tr>
<tr><td><code>0</code></td><td>低电平</td><td>逻辑0，接地</td></tr>
<tr><td><code>1</code></td><td>高电平</td><td>逻辑1，接VDD</td></tr>
<tr><td><code>x</code></td><td>未知</td><td>不确定/冲突（仿真初始态）</td></tr>
<tr><td><code>z</code></td><td>高阻</td><td>三态门断开状态</td></tr></table></div>`},
    {title:'2.4 向量（Vectors）：多位信号',html:`
<p>Verilog 用 <code>[高位:低位]</code> 声明向量。<strong>习惯上最高位在前</strong>。</p>
<pre><code>wire [7:0] data;   // 8位信号，data[7]是MSB
assign data[0] = 1'b1;     // 位选
assign data[3:0] = 4'ha;   // 域选（低4位）
assign y = {a, b, c};      // 位拼接
assign z = {4{a}};         // 复制：{a,a,a,a}</code></pre>`},
    {title:'2.5 数字常量写法',html:`
<p>格式：<code>[位宽]'[基数][数值]</code></p>
<table><tr><th>写法</th><th>含义</th></tr>
<tr><td><code>1'b0</code></td><td>1位二进制0</td></tr>
<tr><td><code>4'b1010</code></td><td>4位二进制1010</td></tr>
<tr><td><code>8'h3f</code></td><td>8位十六进制3F</td></tr>
<tr><td><code>12'd100</code></td><td>12位十进制100</td></tr>
<tr><td><code>32'd100</code></td><td>32位十进制100</td></tr></table>`},
    {title:'2.6 参数 parameter 和 localparam',html:`
<p><code>parameter</code> 是模块的常量参数，可以在实例化时被覆盖，常用于参数化设计。<code>localparam</code> 是模块内部的局部常量，不能被外部修改。</p>
<pre><code>module counter #(parameter WIDTH=8) (
    input clk, rst,
    output reg [WIDTH-1:0] q
);
    localparam MAX = (1&lt;&lt;WIDTH) - 1;
    always @(posedge clk) begin
        if(rst) q &lt;= 0;
        else q &lt;= q + 1;
    end
endmodule
// 实例化时可以覆盖参数
counter #(.WIDTH(16)) u16(.clk(clk),.rst(rst),.q(q16));</code></pre>`}
   ]},
  {id:'ch3',icon:'🔢',title:'第三章：运算符与表达式',desc:'掌握所有运算符，特别注意阻塞与非阻塞赋值的区别',
   sections:[
    {title:'3.1 运算符总览',html:`
<table><tr><th>类别</th><th>运算符</th><th>说明</th></tr>
<tr><td>按位</td><td><code>~ & | ^ ~^</code></td><td>非、与、或、异或、同或</td></tr>
<tr><td>逻辑</td><td><code>! && ||</code></td><td>逻辑非、与、或（结果是1位）</td></tr>
<tr><td>算术</td><td><code>+ - * / %</code></td><td>加减乘除取模</td></tr>
<tr><td>缩减</td><td><code>& | ^ ~& ~|</code></td><td>单目运算，如 &a 是 a所有位相与</td></tr>
<tr><td>移位</td><td><code>&lt;&lt; >> &lt;&lt;< >>></code></td><td>逻辑/算术移位</td></tr>
<tr><td>比较</td><td><code>== != === !== > < >= <=</code></td><td>===会比较x/z</td></tr>
<tr><td>拼接</td><td><code>{a,b}</code></td><td>位拼接；<code>{n{a}}</code>复制n次</td></tr>
<tr><td>条件</td><td><code>? :</code></td><td>三目运算符</td></tr></table>`},
    {title:'3.2 阻塞赋值 = 与非阻塞赋值 <=',html:`
<div class="keypoint"><div class="kp-t">⭐ Verilog 最重要的黄金法则</div><p><strong>组合逻辑用阻塞赋值 <code>=</code>，时序逻辑用非阻塞赋值 <code><=</code>。</strong></p></div>
<p>阻塞赋值 <code>=</code>：立即生效，像 C 语言，语句顺序执行。用在 <code>always @(*)</code> 组合块里。</p>
<p>非阻塞赋值 <code><=</code>：所有赋值在 always 块结束时同时更新，不会产生竞争。用在 <code>always @(posedge clk)</code> 时序块里。</p>
<div class="callout err"><span class="ct">❌ 常见错误</span>在同一个 always 块里混用 = 和 <=；在时序块里用 = 导致仿真与综合不一致。</div>`},
    {title:'3.3 三目运算符与多路选择器',html:`
<p><code>cond ? a : b</code> 是最简洁的二选一写法，综合后就是一个 2-to-1 MUX。</p>
<pre><code>// 2-to-1 MUX
assign y = sel ? b : a;
// 4-to-1 MUX 可以嵌套
assign y = sel[1] ? (sel[0] ? d3 : d2) : (sel[0] ? d1 : d0);</code></pre>`}
   ]},
  {id:'ch4',icon:'🔌',title:'第四章：数据流建模 assign',desc:'用连续赋值描述组合电路'},
  {id:'ch5',icon:'🚪',title:'第五章：门级建模',desc:'内置门原语 and/or/not/nand/nor/xor/xnor'},
  {id:'ch6',icon:'⚡',title:'第六章：组合逻辑 always 块',desc:'always @(*), if-else, case, 避免 latch'},
  {id:'ch7',icon:'⏱️',title:'第七章：时序逻辑基础',desc:'时钟、D触发器、同步/异步复位、寄存器组'},
  {id:'ch8',icon:'🔢',title:'第八章：计数器与分频器',desc:'各种计数器、时钟使能、分频'},
  {id:'ch9',icon:'↔️',title:'第九章：移位寄存器',desc:'串并转换、LFSR伪随机数'},
  {id:'ch10',icon:'🔄',title:'第十章：有限状态机 FSM',desc:'Moore/Mealy、三段式写法、状态编码'},
  {id:'ch11',icon:'🏗️',title:'第十一章：层次化设计',desc:'模块实例化、按位置/按名连接、秒表示例'},
  {id:'ch12',icon:'⚙️',title:'第十二章：generate与参数化设计',desc:'generate for/if/case、function、task'},
  {id:'ch13',icon:'🧪',title:'第十三章：Testbench与验证',desc:'完整Testbench结构、常用系统任务、自验证TB'},
  {id:'ch14',icon:'💡',title:'第十四章：常用组合电路',desc:'MUX、编码器、译码器、ALU、比较器'},
  {id:'ch15',icon:'✨',title:'第十五章：编码规范与最佳实践',desc:'命名规范、推荐/避免清单、代码风格'},
  {id:'ch16',icon:'🌉',title:'第十六章：跨时钟域 CDC（进阶）',desc:'单bit同步器、脉冲同步、握手协议、亚稳态'},
  {id:'ch17',icon:'📦',title:'第十七章：FIFO设计（进阶）',desc:'同步FIFO、异步FIFO、格雷码指针、空满判断'},
  {id:'ch18',icon:'⏰',title:'第十八章：时钟与复位设计（进阶）',desc:'偶数/奇数/小数分频、异步复位同步释放、时钟门控'},
  {id:'ch19',icon:'📡',title:'第十九章：UART串口（进阶）',desc:'波特率发生器、发送器、接收器'},
  {id:'ch20',icon:'🔬',title:'第二十章：DFT可测性设计入门（进阶）',desc:'Scan Chain、BIST——面向集成电路测试方向',},
] as TutorialChapter[];

// 给第4-20章补充sections内容（使用数组方式，避免字符串换行问题）
(function(){
  function S(title: string, html: string): TutorialSection {return{title:title,html:html};}
  TUTORIALS[3].sections=[
    S('4.1 assign连续赋值','<p>assign 语句是数据流建模的核心，用于描述组合逻辑。左边必须是 wire，右边是任何能产生值的表达式。assign 是<strong>持续生效</strong>的，右边任意信号变化，左边立即更新。</p><pre><code>assign y = a &amp; b | c;\nassign {cout, sum} = a + b + cin;</code></pre><p>用 assign 可以实现任何组合逻辑，包括加法器、比较器、MUX 等。</p>'),
    S('4.2 基本门电路','<p>用 assign 可以直接描述各种基本门：</p><pre><code>assign not_y = ~a;        // NOT\nassign and_y = a &amp; b;    // AND\nassign or_y  = a | b;    // OR\nassign xor_y = a ^ b;    // XOR\nassign nand_y = ~(a&amp;b);  // NAND</code></pre>'),
    S('4.3 加法器与比较器','<p>Verilog 中 <code>+</code> 会被综合成加法器，<code>==</code>、<code>&gt;</code>、<code>&lt;</code> 会被综合成比较器。</p><pre><code>assign {cout, sum} = a + b + cin;  // 全加器\nassign eq = (a == b);                // 相等比较\nassign lt = (a &lt; b);                 // 小于比较</code></pre>')
  ];
  TUTORIALS[4].sections=[
    S('5.1 内置基本门原语','<p>Verilog 内置门级原语：<code>and, nand, or, nor, xor, xnor, not, buf</code>。调用方式：<code>门类型 实例名(输出, 输入1, 输入2, ...)</code></p><pre><code>and g1(y, a, b);       // y = a &amp; b\nor  g2(o, a, b, c);   // o = a | b | c\nnot g3(n, a);          // n = ~a</code></pre><div class="callout info"><span class="ct">💡</span>现代 RTL 设计中门级原语用得较少，一般用 assign/always 描述即可。但在标准单元库建模、IO 缓冲等场景依然有用。</div>')
  ];
  TUTORIALS[5].sections=[
    S('6.1 always @(*) 基本用法','<p><code>always @(*)</code> 是描述组合逻辑的过程块。<code>(*)</code> 是敏感列表通配符，表示块内用到的任何信号变化都触发该块。</p><pre><code>reg y;\nalways @(*) begin\n    y = a &amp; b;\nend</code></pre><p>注意：组合 always 块内被赋值的信号必须声明为 reg。</p>'),
    S('6.2 if-else 语句','<p>if-else 跟 C 语言类似，但在组合 always 中使用必须<strong>覆盖所有分支</strong>，否则会推断出 latch！</p><pre><code>always @(*) begin\n    if (sel) y = a;\n    else      y = b;   // 必须有 else！\nend</code></pre>'),
    S('6.3 case 与 casez','<p>case 适合多路选择：</p><pre><code>always @(*) begin\n    case(sel)\n        2\'b00: y = d0;\n        2\'b01: y = d1;\n        2\'b10: y = d2;\n        2\'b11: y = d3;\n        default: y = 1\'b0;  // 防止 latch\n    endcase\nend</code></pre><p><code>casez</code> 允许用 <code>?</code> 表示不关心位，常用于优先编码器。</p>'),
    S('6.4 避免 latch','<div class="keypoint"><div class="kp-t">⭐ 重要原则</div><p>组合 always 块中，<strong>所有输出必须在所有条件下被赋值</strong>。否则会综合出 latch（锁存器），这通常是 bug！</p></div><p>做法：①在 always 开头给所有输出赋默认值；②if 必须配 else；③case 必须配 default。</p>')
  ];
  TUTORIALS[6].sections=[
    S('7.1 时钟与触发器','<p>时序逻辑由时钟驱动，在时钟边沿（通常是上升沿 posedge clk）更新状态。基本单元是 D 触发器：Q 端在时钟上升沿采样 D 端的值，其他时刻保持。</p>'),
    S('7.2 基本D触发器','<pre><code>reg q;\nalways @(posedge clk) begin\n    q &lt;= d;\nend</code></pre>'),
    S('7.3 异步复位与同步复位','<p><strong>异步复位</strong>：复位信号在敏感列表中，复位动作立即生效，不等待时钟沿。</p><pre><code>always @(posedge clk or negedge rst_n) begin\n    if(!rst_n) q &lt;= 1\'b0;\n    else       q &lt;= d;\nend</code></pre><p><strong>同步复位</strong>：复位只在时钟沿被采样。</p><pre><code>always @(posedge clk) begin\n    if(!rst_n) q &lt;= 1\'b0;\n    else       q &lt;= d;\nend</code></pre>'),
    S('7.4 带使能端的D触发器','<pre><code>always @(posedge clk) begin\n    if(en) q &lt;= d;\n    // 不写 else 即保持——这是触发器的特性，不是 latch\nend</code></pre>'),
    S('7.5 寄存器组','<p>多位寄存器组成寄存器组，例如 RISC-V 里的 32x32 寄存器堆：</p><pre><code>reg [31:0] rf [0:31];\nalways @(posedge clk) begin\n    if(we) rf[waddr] &lt;= wdata;\nend\nassign rdata1 = rf[raddr1];</code></pre>')
  ];
  TUTORIALS[7].sections=[
    S('8.1 基本二进制计数器','<pre><code>reg [3:0] cnt;\nalways @(posedge clk or negedge rst_n) begin\n    if(!rst_n) cnt &lt;= 4\'b0;\n    else       cnt &lt;= cnt + 1\'b1;\nend</code></pre>'),
    S('8.2 任意模值计数器','<p>N 进制计数器：计数到 N-1 时清零。</p><pre><code>always @(posedge clk or negedge rst_n) begin\n    if(!rst_n) cnt &lt;= 0;\n    else if(cnt == N-1) cnt &lt;= 0;\n    else cnt &lt;= cnt + 1;\nend</code></pre>'),
    S('8.3 时钟分频','<p>高频时钟分频得到低频时钟。<strong>推荐用时钟使能而非直接造新时钟</strong>，避免时钟歪斜问题。</p><pre><code>// 时钟使能方案（推荐）\nreg [25:0] cnt;\nwire en_1hz = (cnt == 49999999);\nalways @(posedge clk) begin\n    if(en_1hz) cnt &lt;= 0;\n    else cnt &lt;= cnt + 1;\nend</code></pre>')
  ];
  TUTORIALS[8].sections=[
    S('9.1 基本移位寄存器','<pre><code>always @(posedge clk) begin\n    q &lt;= {q[6:0], din};  // 左移，din 从 LSB 移入\nend</code></pre>'),
    S('9.2 串并转换','<p>串行输入、并行输出：每 clk 移位 1bit，N 个时钟后得到 N bit 并行数据。</p>'),
    S('9.3 LFSR 线性反馈移位寄存器','<p>LFSR 用于伪随机数生成、CRC、测试向量产生。例如 8-bit LFSR 反馈在 bit 8、6、5、4：</p><pre><code>reg [7:0] lfsr;\nwire feedback = lfsr[7] ^ lfsr[5] ^ lfsr[4] ^ lfsr[3];\nalways @(posedge clk) lfsr &lt;= {lfsr[6:0], feedback};</code></pre>')
  ];
  TUTORIALS[9].sections=[
    S('10.1 Moore vs Mealy','<p><strong>Moore</strong>：输出只取决于当前状态；<strong>Mealy</strong>：输出取决于当前状态+当前输入。</p>'),
    S('10.2 三段式 FSM','<p>推荐写法：第一段（时序）状态寄存器；第二段（组合）次态逻辑；第三段（组合/时序）输出逻辑。</p><pre><code>// 1. 状态寄存器\nalways @(posedge clk or negedge rst_n)\n    if(!rst_n) state &lt;= IDLE;\n    else state &lt;= next;\n// 2. 次态\nalways @(*) begin\n    next = state;\n    case(state)\n        IDLE: if(start) next = RUN;\n        RUN:  if(done) next = IDLE;\n    endcase\nend\n// 3. 输出\nassign out = (state == RUN);</code></pre>'),
    S('10.3 状态编码','<p>常用编码：二进制（Binary）、格雷码（Gray，适合异步FIFO）、独热码（One-Hot，适合FSM，组合逻辑简单）。</p>')
  ];
  TUTORIALS[10].sections=[
    S('11.1 模块实例化','<p>推荐按名称连接：<code>.模块端口(本地信号)</code>，清晰且不易错。</p><pre><code>and_gate u1(.a(a1), .b(b1), .y(y1));</code></pre>'),
    S('11.2 层次化示例','<p>大电路拆成多个小模块，通过实例化组装。例如秒表：脉冲发生器→计数器→译码器→数码管驱动。</p>')
  ];
  TUTORIALS[11].sections=[
    S('12.1 generate 语句','<p>generate 用于在综合时"展开"重复结构，必须用 genvar 声明循环变量，且 for 块必须命名：</p><pre><code>genvar i;\ngenerate for(i=0; i&lt;8; i=i+1) begin : bit_rev\n    assign out[i] = in[7-i];\nend endgenerate</code></pre>'),
    S('12.2 function 与 task','<p>function 用于描述纯组合的小功能块（有返回值），task 可以包含时序控制（用于 testbench）。</p>')
  ];
  TUTORIALS[12].sections=[
    S('13.1 Testbench 完整结构','<pre><code>`timescale 1ns/1ps\nmodule tb;\n    reg ...; wire ...;  // 1. 信号声明\n    // 2. 实例化 DUT\n    // 3. initial 块产生激励\n    // 4. 可选：$monitor/$display 打印\n    // 5. 可选：自验证检查\nendmodule</code></pre>'),
    S('13.2 常用系统任务','<p><code>$display</code> 打印、<code>$monitor</code> 监控变化、<code>$random</code> 随机数、<code>$finish</code> 结束仿真、<code>$dumpfile/$dumpvars</code> 导出波形。</p>')
  ];
  TUTORIALS[13].sections=[
    S('14.1 多路选择器 MUX','<p>2-to-1, 4-to-1, 8-to-1, N-to-1。用三目、case 或 assign 都可实现。</p>'),
    S('14.2 编码器与优先编码器','<p>普通编码器：输入有优先级；优先编码器用 casex/casez 实现，输出最高优先级的输入编号。</p>'),
    S('14.3 ALU','<p>ALU 是典型组合逻辑，根据 opcode 做加、减、与、或、异或等运算。</p>')
  ];
  TUTORIALS[14].sections=[
    S('15.1 命名规范','<p>建议：clk/rst_n 时钟复位；_n 后缀表低有效；_q/_reg 表寄存器输出；模块名小写+下划线；参数大写；信号名小写。</p>'),
    S('15.2 最佳实践清单','<p>✅ 时序 always 用 &lt;=；组合 always 用 =；always @(*) 配 default；信号位宽显式声明；用参数而非 magic number。</p><p>❌ 不要混用阻塞/非阻塞；不要在多个 always 块给同一 reg 赋值；不要生成非预期 latch。</p>')
  ];
  TUTORIALS[15].sections=[
    S('16.1 亚稳态','<p>当信号在两个时钟域之间传递，若触发器的建立/保持时间不满足，输出会进入亚稳态。解决方法：<strong>两级同步器</strong>（两个背靠背触发器）。</p>'),
    S('16.2 单bit同步器','<pre><code>reg sync1, sync2;\nalways @(posedge clk_dst or negedge rst_n) begin\n    if(!rst_n) begin sync1&lt;=0; sync2&lt;=0; end\n    else begin sync1&lt;=src; sync2&lt;=sync1; end\nend</code></pre>'),
    S('16.3 脉冲同步与握手','<p>多bit信号跨时钟域不能直接打拍，需用：①握手协议（req/ack）；②异步FIFO；③DMUX。</p>')
  ];
  TUTORIALS[16].sections=[
    S('17.1 同步FIFO','<p>单时钟域FIFO：用双端口RAM作为存储，读/写指针分别在wr_en/rd_en时加1，空满标志判断。</p>'),
    S('17.2 异步FIFO与格雷码','<p>异步FIFO读/写在不同时钟域，指针必须用<strong>格雷码</strong>转换后跨时钟域，避免多位同时变化产生亚稳态。</p>')
  ];
  TUTORIALS[17].sections=[
    S('18.1 偶数分频','<p>N为偶数时，用计数器数到N/2-1翻转输出即可，50%占空比。</p>'),
    S('18.2 奇数分频','<p>50%占空比奇数分频需要两个计数器（上升沿/下降沿），输出相或。</p>'),
    S('18.3 异步复位同步释放','<p>避免异步复位撤除时触发器复位释放不一致导致亚稳态：用两级同步器处理复位释放沿。</p>')
  ];
  TUTORIALS[18].sections=[
    S('19.1 波特率发生器','<p>系统时钟分频得到波特率采样脉冲（如 50MHz-&gt;9600 需要 5208 分频）。</p>'),
    S('19.2 发送器 TX','<p>1起始位(0)+8数据位+1停止位(1)，共10位。用移位寄存器+计数器实现。</p>'),
    S('19.3 接收器 RX','<p>检测下降沿→波特率中点采样→接收10位→输出并行数据+valid脉冲。</p>')
  ];
  TUTORIALS[19].sections=[
    S('20.1 Scan Chain 扫描链','<p>DFT 基本技术：把芯片中所有触发器在测试模式下连成一条长移位寄存器，从外部移入测试向量、移出响应，用于检测制造缺陷。</p>'),
    S('20.2 BIST 内建自测试','<p>芯片内部集成测试模式发生器（通常是LFSR）和响应分析器（MISR），自己跑测试输出 pass/fail，大幅降低ATE成本。</p>')
  ];
})();

/* ---------- MICRO EXERCISES (HDLBits-style) ---------- */
export const MICRO_EXERCISES: Exercise[] = [
  {id:'m1',title:'输出零',level:'trivial',len:'约1行',time:'1分钟',
   desc:'<p>Build a circuit with no inputs and one output that always drives <strong>0</strong> (logic low).</p>',
   iface:'module top_module(output zero);',
   hints:['想一想，怎么把一个常量0连到输出端口zero上？','使用 assign 连续赋值语句，把1位常量0赋给zero。','<code>assign zero = 1\'b0;</code>'],
   answer:'module top_module(output zero);\n    assign zero = 1\'b0;\nendmodule',
   tb:'initial begin zero_drive=1\'bz; #10; if(zero!==0) $display("FAIL"); end'
  },
  {id:'m2',title:'输出一',level:'trivial',len:'约1行',time:'1分钟',
   desc:'<p>Build a circuit with no inputs and one output <code>one</code> that always drives <strong>1</strong> (logic high).</p>',
   iface:'module top_module(output one);',
   hints:['和上一题类似，这次输出常量1。','assign 语句可以直接赋常量1。','<code>assign one = 1\'b1;</code>'],
   answer:'module top_module(output one);\n    assign one = 1\'b1;\nendmodule'
  },
  {id:'m3',title:'一根连线（wire）',level:'trivial',len:'约1行',time:'1分钟',
   desc:'<p>Create a wire connecting input <code>in</code> to output <code>out</code>（把输入直接连到输出，像一根导线）。</p>',
   iface:'module top_module(input in, output out);',
   hints:['assign 语句可以把一个信号直接连到另一个。','<code>assign out = in;</code>'],
   answer:'module top_module(input in, output out);\n    assign out = in;\nendmodule'
  },
  {id:'m4',title:'反相器 NOT',level:'trivial',len:'约1行',time:'1分钟',
   desc:'<p>Create a NOT gate: output <code>out</code> is the inverse of input <code>in</code>.</p>',
   iface:'module top_module(input in, output out);',
   hints:['Verilog 中按位取反用什么运算符？','是波浪号 ~。','<code>assign out = ~in;</code>'],
   answer:'module top_module(input in, output out);\n    assign out = ~in;\nendmodule'
  },
  {id:'m5',title:'二输入与门 AND',level:'trivial',len:'约1行',time:'1分钟',
   desc:'<p>Create a 2-input AND gate: y = a AND b.</p>',
   iface:'module top_module(input a, input b, output y);',
   hints:['按位与运算符是 &。','<code>assign y = a & b;</code>'],
   answer:'module top_module(input a, input b, output y);\n    assign y = a & b;\nendmodule'
  },
  {id:'m6',title:'二输入或门 OR',level:'trivial',len:'约1行',time:'1分钟',
   desc:'<p>Create a 2-input OR gate: y = a OR b.</p>',
   iface:'module top_module(input a, input b, output y);',
   hints:['按位或运算符是 |。','<code>assign y = a | b;</code>'],
   answer:'module top_module(input a, input b, output y);\n    assign y = a | b;\nendmodule'
  },
  {id:'m7',title:'二输入异或门 XOR',level:'trivial',len:'约1行',time:'1分钟',
   desc:'<p>Create a 2-input XOR gate: y = a XOR b.</p>',
   iface:'module top_module(input a, input b, output y);',
   hints:['按位异或运算符是 ^。','<code>assign y = a ^ b;</code>'],
   answer:'module top_module(input a, input b, output y);\n    assign y = a ^ b;\nendmodule'
  },
  {id:'m8',title:'二输入与非门 NAND',level:'easy',len:'约1行',time:'1分钟',
   desc:'<p>Create a 2-input NAND gate（与非门）: y = NOT (a AND b).</p>',
   iface:'module top_module(input a, input b, output y);',
   hints:['NAND 就是 AND 再取反。','把 ~ 放在 & 表达式外面。','<code>assign y = ~(a & b);</code>'],
   answer:'module top_module(input a, input b, output y);\n    assign y = ~(a & b);\nendmodule'
  },
  {id:'m9',title:'声明一根内部wire',level:'easy',len:'约2行',time:'2分钟',
   desc:'<p>实现如下电路：先把 a AND b，再把结果和 c OR。你需要声明一根内部 wire 来连接 AND 的输出和 OR 的输入。</p><div class="ex-svg"><svg viewBox="0 0 240 80" width="240" height="80"><line x1="10" y1="25" x2="40" y2="25" stroke="#333" stroke-width="1.5"/><text x="0" y="29" font-size="11">a</text><line x1="10" y1="45" x2="40" y2="45" stroke="#333" stroke-width="1.5"/><text x="0" y="49" font-size="11">b</text><path d="M40 15 L40 55 Q65 55 80 35 Q65 15 40 15 Z" fill="#ddf4ff" stroke="#0969da"/><text x="54" y="39" font-size="11" fill="#0969da">&amp;</text><line x1="80" y1="35" x2="110" y2="35" stroke="#333" stroke-width="1.5"/><line x1="110" y1="35" x2="140" y2="25" stroke="#333" stroke-width="1.5"/><line x1="10" y1="65" x2="140" y2="65" stroke="#333" stroke-width="1.5"/><text x="0" y="69" font-size="11">c</text><path d="M140 15 Q160 15 160 35 Q160 55 140 75 L140 55 Q150 45 140 35 L140 15 Z" fill="#dafbe1" stroke="#1a7f37"/><text x="144" y="48" font-size="11" fill="#1a7f37">≥1</text><line x1="160" y1="45" x2="190" y2="45" stroke="#333" stroke-width="1.5"/><text x="195" y="49" font-size="11">y</text></svg></div>',
   iface:'module top_module(input a,b,c, output y);',
   hints:['内部 wire 用 <code>wire 名字;</code> 声明。','先 assign 内部wire = a & b; 再 assign y = 内部wire | c;','<code>wire and_out; assign and_out = a&b; assign y = and_out|c;</code>'],
   answer:'module top_module(input a,b,c, output y);\n    wire and_out;\n    assign and_out = a & b;\n    assign y = and_out | c;\nendmodule'
  },
  {id:'m10',title:'4位按位取反',level:'easy',len:'约1行',time:'1分钟',
   desc:'<p>输入是4位向量 <code>in[3:0]</code>，输出是它的按位取反 <code>out[3:0] = ~in</code>。</p>',
   iface:'module top_module(input [3:0] in, output [3:0] out);',
   hints:['向量运算和标量一样，~ 直接作用在4位上，每一位都取反。','<code>assign out = ~in;</code>'],
   answer:'module top_module(input [3:0] in, output [3:0] out);\n    assign out = ~in;\nendmodule'
  },
  {id:'m11',title:'4位按位与',level:'easy',len:'约1行',time:'1分钟',
   desc:'<p>两个4位输入 a、b，输出 y[3:0] 是它们的按位 AND。</p>',
   iface:'module top_module(input [3:0] a,b, output [3:0] y);',
   hints:['按位运算会对每一位分别做 AND，无需逐位写。','<code>assign y = a & b;</code>'],
   answer:'module top_module(input [3:0] a,b, output [3:0] y);\n    assign y = a & b;\nendmodule'
  },
  {id:'m12',title:'向量位拼接',level:'easy',len:'约1行',time:'2分钟',
   desc:'<p>有5个1位输入 a,b,c,d,e，把它们拼接成一个5位输出 y[4:0]，其中 a 在最高位（y[4]），e 在最低位（y[0]）。</p>',
   iface:'module top_module(input a,b,c,d,e, output [4:0] y);',
   hints:['使用位拼接运算符 <code>{a, b, ...}</code>，顺序是从高位到低位。','<code>assign y = {a,b,c,d,e};</code>'],
   answer:'module top_module(input a,b,c,d,e, output [4:0] y);\n    assign y = {a,b,c,d,e};\nendmodule'
  },
  {id:'m13',title:'1位半加器',level:'easy',len:'约2行',time:'3分钟',
   desc:'<p>1位半加器：输入 a,b；输出 sum = a XOR b，cout = a AND b。</p>',
   iface:'module top_module(input a,b, output sum,cout);',
   hints:['sum 是异或，cout 是与。','<code>assign sum=a^b; assign cout=a&b;</code>'],
   answer:'module top_module(input a,b, output sum,cout);\n    assign sum = a ^ b;\n    assign cout = a & b;\nendmodule'
  },
  {id:'m14',title:'基本D触发器（无复位）',level:'easy',len:'约3行',time:'3分钟',
   desc:'<p>实现一个 D 触发器：上升沿触发，无复位。输出 q 在时钟上升沿采样 d。</p>',
   iface:'module top_module(input clk, input d, output reg q);',
   hints:['D触发器用时序 always 块，敏感列表是 posedge clk。','使用非阻塞赋值 <=。','<code>always @(posedge clk) q <= d;</code>'],
   answer:'module top_module(input clk, input d, output reg q);\n    always @(posedge clk) begin\n        q <= d;\n    end\nendmodule'
  },
  {id:'m15',title:'带同步复位的D触发器',level:'easy',len:'约5行',time:'4分钟',
   desc:'<p>实现带同步复位（高有效 reset）的 D 触发器。reset=1 时 q 清零，否则 q<=d。</p>',
   iface:'module top_module(input clk, reset, d, output reg q);',
   hints:['同步复位的复位信号不在敏感列表里，只在 always 内部用 if 判断。','<code>always @(posedge clk) if(reset) q<=0; else q<=d;</code>'],
   answer:'module top_module(input clk, reset, d, output reg q);\n    always @(posedge clk) begin\n        if(reset) q <= 1\'b0;\n        else q <= d;\n    end\nendmodule'
  }
];

/* ---------- GENERAL EXERCISES ---------- */
export const EXERCISES: Exercise[] = [
  {id:'e1',title:'反相器（NOT门）',level:'trivial',len:'1行',time:'1分钟',
   desc:'<p>实现一个反相器：输入 a，输出 y = ~a。</p>',
   iface:'module not_gate(input wire a, output wire y);',
   hints:['直接用 assign 加 ~。','<code>assign y = ~a;</code>'],
   answer:'module not_gate(input wire a, output wire y);\n    assign y = ~a;\nendmodule'},
  {id:'e2',title:'二输入或门',level:'trivial',len:'1行',time:'1分钟',
   desc:'<p>实现二输入或门：y = a | b。</p>',
   iface:'module or_gate(input a,b, output y);',
   hints:['| 运算符。','<code>assign y=a|b;</code>'],
   answer:'module or_gate(input a,b, output y);\n    assign y = a | b;\nendmodule'},
  {id:'e3',title:'二输入异或门',level:'trivial',len:'1行',time:'1分钟',
   desc:'<p>二输入 XOR 门。</p>',iface:'module xor_gate(input a,b, output y);',
   hints:['^ 运算符。'],answer:'module xor_gate(input a,b, output y); assign y=a^b; endmodule'},
  {id:'e4',title:'二输入与非门 NAND',level:'trivial',len:'1行',time:'1分钟',
   desc:'<p>NAND = NOT(AND)。</p>',iface:'module nand_gate(input a,b, output y);',
   hints:['把 ~ 作用在 & 上。'],answer:'module nand_gate(input a,b, output y); assign y=~(a&b); endmodule'},
  {id:'e5',title:'1位半加器',level:'easy',len:'2行',time:'3分钟',
   desc:'<p>半加器：sum=a^b, cout=a&b。</p>',iface:'module half_adder(input a,b, output sum,cout);',
   hints:['sum用^，cout用&。'],answer:'module half_adder(input a,b, output sum,cout); assign sum=a^b; assign cout=a&b; endmodule'},
  {id:'e6',title:'1位全加器',level:'easy',len:'2-3行',time:'5分钟',
   desc:'<p>全加器：sum = a^b^cin; cout = (a&b)|(a&cin)|(b&cin); 或用级联 <code>{cout,sum}=a+b+cin</code>。</p>',
   iface:'module full_adder(input a,b,cin, output sum,cout);',
   hints:['推荐用拼接加法：<code>{cout,sum} = a+b+cin</code>。'],
   answer:'module full_adder(input a,b,cin, output sum,cout);\n    assign {cout,sum} = a + b + cin;\nendmodule'},
  {id:'e7',title:'2选1多路选择器',level:'easy',len:'1行',time:'2分钟',
   desc:'<p>sel=0 选 a，sel=1 选 b。</p>',iface:'module mux2to1(input a,b,sel, output y);',
   hints:['三目运算符。'],answer:'module mux2to1(input a,b,sel, output y); assign y=sel?b:a; endmodule'},
  {id:'e8',title:'4位NOT门',level:'easy',len:'1行',time:'1分钟',
   desc:'<p>4位按位取反。</p>',iface:'module not4(input [3:0]a, output [3:0]y);',
   hints:['<code>assign y=~a;</code>'],answer:'module not4(input [3:0]a, output [3:0]y); assign y=~a; endmodule'},
  {id:'e9',title:'4位AND',level:'easy',len:'1行',time:'1分钟',
   desc:'<p>4位按位与。</p>',iface:'module and4(input [3:0]a,b, output [3:0]y);',
   answer:'module and4(input [3:0]a,b, output [3:0]y); assign y=a&b; endmodule'},
  {id:'e10',title:'基本D触发器',level:'easy',len:'3行',time:'3分钟',
   desc:'<p>上升沿DFF，无复位。</p>',iface:'module dff(input clk,d, output reg q);',
   hints:['always @(posedge clk) q<=d;'],
   answer:'module dff(input clk,d, output reg q); always @(posedge clk) q<=d; endmodule'},
  {id:'e11',title:'异步复位DFF',level:'easy',len:'5行',time:'4分钟',
   desc:'<p>异步高有效复位。</p>',iface:'module dff_ar(input clk,rst,d, output reg q);',
   hints:['敏感列表加 posedge rst。'],
   answer:'module dff_ar(input clk,rst,d, output reg q);\n    always @(posedge clk or posedge rst)\n        if(rst) q<=0; else q<=d;\nendmodule'},
  {id:'e12',title:'4位加法器',level:'easy',len:'1行',time:'2分钟',
   desc:'<p>4位加法器，带进位输出。</p>',iface:'module add4(input [3:0]a,b, input cin, output [3:0]sum, output cout);',
   hints:['{cout,sum}=a+b+cin。'],
   answer:'module add4(input [3:0]a,b, input cin, output [3:0]sum, output cout);\n    assign {cout,sum}=a+b+cin;\nendmodule'},
  {id:'e13',title:'4-16译码器',level:'medium',len:'1行',time:'5分钟',
   desc:'<p>4位地址in，16位独热码输出out（in位为1）。使用移位。</p>',iface:'module dec4_16(input [3:0]in, output reg [15:0]out);',
   hints:['<code>out = 1\'b1 << in;</code>'],
   answer:'module dec4_16(input [3:0]in, output [15:0]out);\n    assign out = 16\'b1 << in;\nendmodule'},
  {id:'e14',title:'4位二进制计数器',level:'medium',len:'7行',time:'5分钟',
   desc:'<p>异步复位，上升沿计数0-15循环。</p>',iface:'module cnt4(input clk,rst, output reg [3:0]q);',
   answer:'module cnt4(input clk,rst, output reg [3:0]q);\n    always @(posedge clk or posedge rst)\n        if(rst) q<=0; else q<=q+1;\nendmodule'},
  {id:'e15',title:'BCD十进制计数器',level:'medium',len:'7行',time:'6分钟',
   desc:'<p>计数0-9，到9后回到0。</p>',iface:'module cnt10(input clk,rst, output reg [3:0]q);',
   hints:['计数到9清零。'],
   answer:'module cnt10(input clk,rst, output reg [3:0]q);\n    always @(posedge clk or posedge rst)\n        if(rst) q<=0;\n        else if(q==4\'d9) q<=0;\n        else q<=q+1;\nendmodule'},
  {id:'e16',title:'8位移位寄存器',level:'medium',len:'4行',time:'5分钟',
   desc:'<p>左移移位寄存器，din 移入最低位。</p>',iface:'module sft8(input clk,din, output reg [7:0]q);',
   answer:'module sft8(input clk,din, output reg [7:0]q);\n    always @(posedge clk) q<={q[6:0],din};\nendmodule'},
  {id:'e17',title:'带同步置数的计数器',level:'medium',len:'10行',time:'8分钟',
   desc:'<p>load=1时q=d；否则计数。</p>',iface:'module cnt_load(input clk,rst,load, [7:0]d, output reg [7:0]q);',
   answer:'module cnt_load(input clk,rst,load, input [7:0]d, output reg [7:0]q);\n    always @(posedge clk)\n        if(rst) q<=0;\n        else if(load) q<=d;\n        else q<=q+1;\nendmodule'},
  {id:'e18',title:'4位比较器',level:'medium',len:'3行',time:'5分钟',
   desc:'<p>输出 eq=(a==b), lt=(a&lt;b), gt=(a>b)。</p>',iface:'module cmp4(input [3:0]a,b, output eq,lt,gt);',
   answer:'module cmp4(input [3:0]a,b, output eq,lt,gt);\n    assign eq=(a==b); assign lt=(a<b); assign gt=(a>b);\nendmodule'},
  {id:'e19',title:'8位奇偶校验',level:'easy',len:'1行',time:'2分钟',
   desc:'<p>输出1当输入有奇数个1。使用缩减运算符^。</p>',iface:'module parity(input [7:0]d, output odd);',
   hints:['<code>^d</code> 是缩减异或。'],
   answer:'module parity(input [7:0]d, output odd); assign odd=^d; endmodule'},
  {id:'e20',title:'带使能DFF',level:'easy',len:'5行',time:'3分钟',
   desc:'<p>en=1时q<=d，en=0时保持。</p>',iface:'module dffe(input clk,rst,en,d, output reg q);',
   answer:'module dffe(input clk,rst,en,d, output reg q);\n    always @(posedge clk)\n        if(rst) q<=0; else if(en) q<=d;\nendmodule'},
  {id:'e21',title:'3-8译码器',level:'medium',len:'5行',time:'5分钟',
   desc:'<p>3位地址→8位独热码，高有效。</p>',iface:'module dec3_8(input [2:0]a, output reg [7:0]y);',
   answer:'module dec3_8(input [2:0]a, output reg [7:0]y);\n    always @(*) y=8\'b1<<a;\nendmodule'},
  {id:'e22',title:'8-3优先编码器',level:'medium',len:'10行',time:'8分钟',
   desc:'<p>输入8位，输出最高位1的位置编号（3位）。</p>',iface:'module prio8(input [7:0]d, output reg [2:0]y);',
   hints:['用 casez，?表不关心。'],
   answer:'module prio8(input [7:0]d, output reg [2:0]y);\n    always @(*) casez(d)\n        8\'b1???????:y=7;\n        8\'b01??????:y=6;\n        8\'b001?????:y=5;\n        8\'b0001????:y=4;\n        8\'b00001???:y=3;\n        8\'b000001??:y=2;\n        8\'b0000001?:y=1;\n        default:y=0;\n    endcase\nendmodule'},
  {id:'e23',title:'4选1 MUX（8位宽）',level:'medium',len:'6行',time:'5分钟',
   desc:'<p>4个8位输入，sel选择输出。</p>',iface:'module mux4_8(input [7:0]d0,d1,d2,d3, input [1:0]sel, output reg [7:0]y);',
   answer:'module mux4_8(input [7:0]d0,d1,d2,d3, input [1:0]sel, output reg [7:0]y);\n    always @(*) case(sel)\n        2\'b00:y=d0; 2\'b01:y=d1; 2\'b10:y=d2; default:y=d3;\n    endcase\nendmodule'},
  {id:'e24',title:'50MHz->1KHz分频',level:'medium',len:'10行',time:'8分钟',
   desc:'<p>用时钟使能方式：产生1KHz脉冲en_1k（每50000个clk一次）。</p>',iface:'module clkdiv(input clk,rst, output reg en_1k);',
   hints:['计数器到49999输出1并清零。'],
   answer:'module clkdiv(input clk,rst, output reg en_1k);\n    reg [15:0] cnt;\n    always @(posedge clk) if(rst) cnt<=0;\n        else if(cnt==49999) begin cnt<=0; en_1k<=1; end\n        else begin cnt<=cnt+1; en_1k<=0; end\nendmodule'},
  {id:'e25',title:'"101"序列检测器 Moore',level:'hard',len:'25行',time:'15分钟',
   desc:'<p>检测串行输入中"101"序列（Moore型，不重叠），匹配时输出1。</p>',iface:'module seq101(input clk,rst,din, output reg out);',
   hints:['三段式FSM：S0/S1/S2/S3 四个状态；S3表示已检测到101。'],
   answer:'module seq101(input clk,rst,din, output reg out);\n    parameter S0=0,S1=1,S2=2,S3=3;\n    reg [1:0] state,next;\n    always @(posedge clk or posedge rst) if(rst) state<=S0; else state<=next;\n    always @(*) begin\n        next=state;\n        case(state)\n            S0:next=din?S1:S0;\n            S1:next=din?S1:S2;\n            S2:next=din?S3:S0;\n            S3:next=din?S1:S0;\n        endcase\n    end\n    always @(*) out=(state==S3);\nendmodule'},
  {id:'e26',title:'8位LFSR',level:'hard',len:'8行',time:'10分钟',
   desc:'<p>8位LFSR，反馈位在 [8,6,5,4]（最大长度255）。</p>',iface:'module lfsr8(input clk,rst,en, output reg [7:0]q);',
   answer:'module lfsr8(input clk,rst,en, output reg [7:0]q);\n    wire fb=q[7]^q[5]^q[4]^q[3];\n    always @(posedge clk) if(rst) q<=8\'h1;\n        else if(en) q<={q[6:0],fb};\nendmodule'},
  {id:'e27',title:'交通灯控制器',level:'hard',len:'40行',time:'20分钟',
   desc:'<p>红5s→绿5s→黄2s循环，简化版（单方向）。假设已有1Hz使能。</p>',iface:'module traffic(input clk,rst,en, output reg red,green,yellow);',
   hints:['计数器0-11，0-4红，5-9绿，10-11黄。'],
   answer:'module traffic(input clk,rst,en, output reg red,green,yellow);\n    reg [3:0] cnt;\n    always @(posedge clk) if(rst) cnt<=0;\n        else if(en) cnt<=(cnt==11)?0:cnt+1;\n    always @(*) begin\n        red=(cnt<5); green=(cnt>=5&&cnt<10); yellow=(cnt>=10);\n    end\nendmodule'},
  {id:'e28',title:'按键消抖',level:'hard',len:'15行',time:'15分钟',
   desc:'<p>按键信号同步+20ms延时消抖，输出消抖后的按键值。假设clk=50MHz。</p>',iface:'module debounce(input clk,rst,key, output reg key_out);',
   hints:['两级同步+计数器，稳定20ms后输出。'],
   answer:'module debounce(input clk,rst,key, output reg key_out);\n    reg s1,s2; reg [19:0]cnt;\n    always @(posedge clk) begin s1<=key; s2<=s1; end\n    always @(posedge clk) if(rst) begin cnt<=0;key_out<=0;end\n        else if(key_out!=s2) begin cnt<=cnt+1; if(&cnt) key_out<=s2; end\n        else cnt<=0;\nendmodule'},
  {id:'e29',title:'串行加法器',level:'hard',len:'20行',time:'15分钟',
   desc:'<p>用1位全加器+移位寄存器实现串行加法器，8个时钟完成8位加法。</p>',iface:'module serial_add(input clk,rst,start, input [7:0]a,b, output reg [7:0]sum, output reg done);',
   answer:'// 移位寄存器+1位FA循环，篇幅略。核心：每次加1位，8次完成'},
  {id:'e30',title:'简化UART发送',level:'hard',len:'30行',time:'20分钟',
   desc:'<p>10位帧结构：1起始(0)+8数据+1停止(1)，波特率9600，假设已给波特率使能。</p>',iface:'module uart_tx(input clk,rst,tx_en, input [7:0]data, output reg txd,tx_done);',
   answer:'// 移位寄存器+4位计数器实现，详见项目实战章节'}
];

/* ---------- BUG HUNT ---------- */
export const BUGS: BugCase[] = [
  {id:'b1',title:'不完整 if 产生 Latch',
   desc:'<p>下面代码试图实现一个 2-to-1 MUX，但综合时会产生 latch。找出 bug 并修复。</p>',
   buggy:`module mux_bug(input a,b,sel, output reg y);
    always @(*) begin
        if(sel)
            y = b;
        // BUG: 缺少 else 分支！sel=0 时 y 保持，产生 latch
    end
endmodule`,
   explanation:'组合逻辑 always 块中，如果 if 没有配套 else，那么条件不满足时输出保持原值。但组合逻辑不能有记忆，这会综合出一个 latch（锁存器），通常不是你想要的。',
   fix:`module mux_fix(input a,b,sel, output reg y);
    always @(*) begin
        if(sel)  y = b;
        else     y = a;   // 补全 else
    end
endmodule`},
  {id:'b2',title:'时序逻辑中使用阻塞赋值',
   desc:'<p>下面是一个移位寄存器，但仿真结果与综合后电路行为不一致。找出 bug。</p>',
   buggy:`module shift_bug(input clk,d, output reg [3:0] q);
    always @(posedge clk) begin
        q[0] = d;    // BUG: 时序块用了 = 阻塞赋值
        q[1] = q[0];
        q[2] = q[1];
        q[3] = q[2];
    end
endmodule`,
   explanation:'时序 always 块中使用 = 阻塞赋值，语句按顺序立即生效，导致一个时钟沿内 q[0] 先变，q[1] 接着读到新值，最终 4 位全变成 d，相当于 1 个时钟就把 d 送到 q[3]，不是移位寄存器。',
   fix:`module shift_fix(input clk,d, output reg [3:0] q);
    always @(posedge clk) begin
        q[0] <= d;    // 用 <= 非阻塞，所有赋值在块结束时同时更新
        q[1] <= q[0];
        q[2] <= q[1];
        q[3] <= q[2];
    end
endmodule`},
  {id:'b3',title:'组合逻辑敏感列表不全',
   desc:'<p>下面的 always 块试图描述组合逻辑，但仿真中输出不随 a 变化。</p>',
   buggy:`module sens_bug(input a,b,c, output reg y);
    always @(b or c) begin  // BUG: 敏感列表漏了 a
        y = a & b | c;
    end
endmodule`,
   explanation:'敏感列表只列出了 b 和 c，当 a 变化时 always 块不会重新计算，导致 y 不更新、仿真与综合不一致。解决：始终用 <code>@(*)</code> 让工具自动推导敏感列表。',
   fix:`module sens_fix(input a,b,c, output reg y);
    always @(*) begin
        y = a & b | c;
    end
endmodule`},
  {id:'b4',title:'if-else 分支未赋值所有输出',
   desc:'<p>下面 ALU 代码中，加法输出正确，但减法输出 cout 为不定值/旧值。</p>',
   buggy:`module alu_bug(input [3:0]a,b, input sub, output reg [3:0]y, output reg cout);
    always @(*) begin
        if(sub) begin
            y = a - b;
            // BUG: 没给 cout 赋值
        end else begin
            {cout,y} = a + b;
        end
    end
endmodule`,
   explanation:'if 分支只给 y 赋值，没给 cout 赋值。进入 if 分支时 cout 保持旧值，产生 latch。修复：always 开头给所有输出赋默认值。',
   fix:`module alu_fix(input [3:0]a,b, input sub, output reg [3:0]y, output reg cout);
    always @(*) begin
        y = 0; cout = 0;  // 默认值
        if(sub) y = a - b;
        else {cout,y} = a + b;
    end
endmodule`},
  {id:'b5',title:'多个always块给同一reg赋值',
   desc:'<p>下面代码试图用两个 always 块处理复位和正常逻辑，但会产生多驱动错误。</p>',
   buggy:`module multi_bug(input clk,rst,d, output reg q);
    always @(posedge clk) q <= d;      // BUG
    always @(posedge rst) q <= 1'b0;   // BUG: 两个always都给q赋值
endmodule`,
   explanation:'Verilog 中一个 reg 只能在一个 always 块中赋值，否则综合后会出现两个驱动源冲突（multi-drive）。异步复位必须写在同一个 always 块的敏感列表里。',
   fix:`module multi_fix(input clk,rst,d, output reg q);
    always @(posedge clk or posedge rst) begin
        if(rst) q <= 1'b0;
        else    q <= d;
    end
endmodule`},
  {id:'b6',title:'位宽不匹配导致高位丢失',
   desc:'<p>下面计数器期望计到 999，但实际上计到 127 就归零了。</p>',
   buggy:`module cnt_bug(input clk,rst, output reg [6:0] cnt);  // BUG: 位宽只有7位，最大127
    always @(posedge clk) begin
        if(rst) cnt <= 0;
        else if(cnt < 999) cnt <= cnt + 1;
        else cnt <= 0;
    end
endmodule`,
   explanation:'7位寄存器最大表示 127，不能存 999（需要10位）。位宽不匹配会导致高位被截断，计数值错误。',
   fix:`module cnt_fix(input clk,rst, output reg [9:0] cnt);  // 改成10位
    always @(posedge clk) begin
        if(rst) cnt <= 0;
        else if(cnt < 999) cnt <= cnt + 1;
        else cnt <= 0;
    end
endmodule`},
  {id:'b7',title:'case 缺少 default 产生 latch',
   desc:'<p>下面 4-to-1 MUX 只列了 00/01/10 三种情况，缺了 11 和 default。</p>',
   buggy:`module case_bug(input [1:0]sel, input a,b,c, output reg y);
    always @(*) begin
        case(sel)
            2'b00: y = a;
            2'b01: y = b;
            2'b10: y = c;
            // BUG: 缺 default 或 2'b11 分支
        endcase
    end
endmodule`,
   explanation:'case 语句没有覆盖所有可能值时，未覆盖的情况输出保持，产生 latch。必须加 default。',
   fix:`module case_fix(input [1:0]sel, input a,b,c,d, output reg y);
    always @(*) begin
        case(sel)
            2'b00: y = a;
            2'b01: y = b;
            2'b10: y = c;
            default: y = d;
        endcase
    end
endmodule`},
  {id:'b8',title:'异步复位缺少rst在敏感列表',
   desc:'<p>代码想做异步复位，但仿真时复位不立即生效（要等时钟沿）。</p>',
   buggy:`module arst_bug(input clk,rst,d, output reg q);
    always @(posedge clk) begin  // BUG: 敏感列表漏了 posedge rst
        if(rst) q <= 0;
        else q <= d;
    end
endmodule`,
   explanation:'异步复位必须把复位信号加入敏感列表：<code>@(posedge clk or posedge rst)</code>，否则复位只在时钟沿才被采样，变成了同步复位。',
   fix:`module arst_fix(input clk,rst,d, output reg q);
    always @(posedge clk or posedge rst) begin
        if(rst) q <= 0;
        else q <= d;
    end
endmodule`}
];

/* ---------- WAVEFORM READING ---------- */
export const WAVEFORMS: WaveformCase[] = [
  {id:'w1',title:'根据波形判断是什么电路',
   desc:'<p>观察下面的输入输出波形，判断电路实现的是什么功能？</p>',
   svg:`<svg viewBox="0 0 500 120" width="500" height="120" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="11">
     <text x="5" y="20">clk</text><line x1="50" y1="15" x2="480" y2="15" stroke="#333"/><g stroke="#333" stroke-width="1.2">
     <path d="M50 20 L50 10 L70 10 L70 20 M90 20 L90 10 L110 10 L110 20 M130 20 L130 10 L150 10 L150 20 M170 20 L170 10 L190 10 L190 20 M210 20 L210 10 L230 10 L230 20 M250 20 L250 10 L270 10 L270 20 M290 20 L290 10 L310 10 L310 20 M330 20 L330 10 L350 10 L350 20 M370 20 L370 10 L390 10 L390 20 M410 20 L410 10 L430 10 L430 20 M450 20 L450 10 L470 10 L470 20"/></g>
     <text x="5" y="50">d</text><path d="M50 50 L80 50 L80 40 L200 40 L200 50 L280 50 L280 40 L400 40 L400 50 L480 50" stroke="#0969da" stroke-width="1.5" fill="none"/>
     <text x="5" y="85">q</text><path d="M50 85 L70 85 L70 75 L110 75 L110 85 L230 85 L230 75 L310 75 L310 85 L430 85 L430 75 L480 75" stroke="#1a7f37" stroke-width="1.5" fill="none"/>
     <text x="5" y="110" font-size="10" fill="#8b949e">（q比d晚一个时钟沿）</text>
   </svg>`,
   answer:'<p>这是一个<strong>标准 D 触发器</strong>（无复位）。q 在每个时钟上升沿采样 d 的值，所以 q 比 d 延迟一个时钟周期。</p>'},
  {id:'w2',title:'识别分频器输出',
   desc:'<p>clk 是50MHz时钟，out 是某分频器输出，问 out 频率是多少？',
   svg:`<svg viewBox="0 0 500 90" width="500" height="90" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="11">
     <text x="5" y="20">clk</text><g stroke="#333" stroke-width="1"><path d="M50 20 L50 10 L60 10 L60 20 M70 20 L70 10 L80 10 L80 20 M90 20 L90 10 L100 10 L100 20 M110 20 L110 10 L120 10 L120 20 M130 20 L130 10 L140 10 L140 20 M150 20 L150 10 L160 10 L160 20 M170 20 L170 10 L180 10 L180 20 M190 20 L190 10 L200 10 L200 20"/></g><line x1="200" y1="15" x2="480" y2="15" stroke="#333" stroke-dasharray="3,3"/>
     <text x="5" y="55">out</text><path d="M50 45 L130 45 L130 55 L210 55 L210 45 L290 45 L290 55 L370 55 L370 45 L450 45 L450 55 L480 55" stroke="#cf222e" stroke-width="1.5" fill="none"/>
     <text x="5" y="80" font-size="10" fill="#8b949e">（out每4个clk翻转一次）</text>
   </svg>`,
   answer:'<p>out 每 4 个时钟周期翻转一次，所以完整周期是 8 个时钟周期。频率 = 50MHz / 8 = <strong>6.25MHz</strong>，这是一个 <strong>3位二进制计数器最高位输出（8分频）</strong>。</p>'},
  {id:'w3',title:'识别MUX输出',
   desc:'<p>根据波形判断：sel=0 时 y 等于哪个输入？sel=1 时呢？',
   svg:`<svg viewBox="0 0 500 120" width="500" height="120" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="11">
     <text x="5" y="20">a</text><path d="M50 20 L150 20 L150 10 L300 10 L300 20 L480 20" stroke="#0969da" stroke-width="1.5" fill="none"/>
     <text x="5" y="50">b</text><path d="M50 40 L100 40 L100 50 L250 50 L250 40 L350 40 L350 50 L480 50" stroke="#8250df" stroke-width="1.5" fill="none"/>
     <text x="5" y="80">sel</text><path d="M50 80 L200 80 L200 70 L480 70" stroke="#9a6700" stroke-width="1.5" fill="none"/>
     <text x="5" y="110">y</text><path d="M50 100 L100 100 L100 110 L200 110 L200 100 L480 100" stroke="#1a7f37" stroke-width="1.5" fill="none"/>
   </svg>`,
   answer:'<p>sel=0 时 y 跟随 a（0），sel=1 时 y 跟随 b（在b=1时y=1）。所以这是一个 <strong>2-to-1 MUX</strong>，sel=1 选 b，sel=0 选 a。</p>'}
];

/* ---------- PROJECT: UART series ---------- */
export const PROJECTS: ProjectStep[] = [
  {id:'p1',part:'1/5',title:'波特率发生器',level:'easy',len:'约8行',time:'10分钟',
   desc:'<p>假设系统时钟 50MHz，要产生 9600 波特率的采样脉冲 <code>baud_en</code>。每计 5208 个时钟周期产生一个周期的高脉冲。</p>',
   iface:'module baud_gen(input clk,rst, output reg baud_en);',
   hints:['计数器宽度需要 13 位（2^13=8192 > 5208）。','计到 5207 时 baud_en=1，计数器清零；否则 baud_en=0，计数+1。'],
   answer:'module baud_gen(input clk,rst, output reg baud_en);\n    reg [12:0] cnt;\n    always @(posedge clk) begin\n        if(rst) begin cnt<=0; baud_en<=0; end\n        else if(cnt==13\'d5207) begin cnt<=0; baud_en<=1; end\n        else begin cnt<=cnt+1; baud_en<=0; end\n    end\nendmodule',
   note:'波特率 = 50MHz / (5208) ≈ 9600 bps'},
  {id:'p2',part:'2/5',title:'发送状态机（起始位+数据位）',level:'medium',len:'约25行',time:'20分钟',
   desc:'<p>UART 发送：当 tx_start=1 时开始发送，先发 1 位起始位(0)，再发 8 位数据（LSB first），再发 1 位停止位(1)，空闲时 tx=1。使用 baud_en 作为发送节拍。</p>',
   iface:'module uart_tx(input clk,rst,baud_en,tx_start, input [7:0]din, output reg txd, output reg tx_done);',
   hints:['定义 IDLE=0, START=1, DATA=2, STOP=3 四个状态。DATA 状态用计数器[2:0]发送8位，移位寄存器发出。'],
   answer:'module uart_tx(input clk,rst,baud_en,tx_start, input [7:0]din, output reg txd, output reg tx_done);\n    parameter IDLE=0,START=1,DATA=2,STOP=3;\n    reg [1:0] state; reg [2:0] bit_cnt; reg [7:0] shift;\n    always @(posedge clk) begin\n        if(rst) begin state<=IDLE; txd<=1; tx_done<=0; end\n        else if(baud_en) case(state)\n            IDLE: if(tx_start) begin state<=START; shift<=din; txd<=0; tx_done<=0; end\n            START: begin state<=DATA; bit_cnt<=0; txd<=shift[0]; end\n            DATA: begin txd<=shift[0]; shift<=shift>>1; bit_cnt<=bit_cnt+1;\n                   if(&bit_cnt) state<=STOP; end\n            STOP: begin state<=IDLE; txd<=1; tx_done<=1; end\n        endcase\n    end\nendmodule'},
  {id:'p3',part:'3/5',title:'接收器：起始位检测',level:'medium',len:'约15行',time:'15分钟',
   desc:'<p>UART 接收的关键：检测 rxd 的下降沿作为起始位，然后在每个位周期中点（起始位后1个baud周期）采样，避免在信号跳变沿采样。</p>',
   iface:'module rx_start(input clk,rst,baud_en,rxd, output reg start_det);',
   hints:['用两级同步器同步 rxd，然后检测下降沿（rxd_sync1=0 且 rxd_sync2=1）。'],
   answer:'module rx_start(input clk,rst,baud_en,rxd, output reg start_det);\n    reg s1,s2; always @(posedge clk) begin s1<=rxd; s2<=s1; end\n    always @(posedge clk) if(rst) start_det<=0;\n        else start_det <= (~s1 & s2);  // 下降沿检测\nendmodule'},
  {id:'p4',part:'4/5',title:'完整接收器',level:'hard',len:'约35行',time:'30分钟',
   desc:'<p>完整 UART RX：检测起始位→中点采样→移位接收8位→输出数据+valid。建议在每个位的中点采样（即检测到起始位后半baud周期开始采样，之后每个baud周期采一次）。</p>',
   iface:'module uart_rx(input clk,rst,baud_en,rxd, output reg [7:0]dout, output reg rx_valid);',
   hints:['IDLE→START（检测下降沿）→WAIT_HALF（半周期对齐到中点）→DATA（接收8位）→STOP（输出valid）。中点采样可在START状态先等半个baud周期。'],
   answer:'// 核心结构类似TX，但多一个半周期对齐，篇幅略。完整答案可参考UART章节。'},
  {id:'p5',part:'5/5',title:'回环测试（Loopback）',level:'hard',len:'约20行',time:'20分钟',
   desc:'<p>把 TX 和 RX 实例化到顶层，用一个开关控制：开关=0时TX发送固定字符"A"；开关=1时RX接收的数据直接回送到TX再发一次（回声模式）。这是一个完整的 SoC 级集成练习。</p>',
   iface:'module uart_loopback(input clk,rst,rxd, output txd, input echo_mode);',
   hints:['实例化 baud_gen、uart_tx、uart_rx；echo_mode=0 时 din=8\'h41（A）+ tx_start=1 连续发送；=1 时 rx_valid 触发 tx_start，din=rxd_dout。'],
   answer:'// 层次化实例化，篇幅略。重点是模块连接和握手。'}
];

/* ---------- REFERENCE ---------- */
export const REF_TABS: ReferenceTab[] = [
  {id:'ref-basic',label:'基础语法',content:`
<table><tr><th>语法</th><th>用法</th></tr>
<tr><td><code>module/endmodule</code></td><td>定义模块</td></tr>
<tr><td><code>input/output/inout</code></td><td>端口方向</td></tr>
<tr><td><code>wire/reg</code></td><td>线网/寄存器类型</td></tr>
<tr><td><code>assign</code></td><td>连续赋值（组合逻辑）</td></tr>
<tr><td><code>always @(*)</code></td><td>组合逻辑过程块</td></tr>
<tr><td><code>always @(posedge clk)</code></td><td>时序逻辑过程块</td></tr>
<tr><td><code>if/else</code></td><td>条件语句</td></tr>
<tr><td><code>case/default/endcase</code></td><td>多路选择</td></tr>
<tr><td><code>for</code></td><td>循环（组合逻辑用integer）</td></tr>
<tr><td><code>generate/genvar</code></td><td>生成块（参数化重复结构）</td></tr>
<tr><td><code>parameter/localparam</code></td><td>参数/局部常量</td></tr>
<tr><td><code>function/endfunction</code></td><td>组合功能函数</td></tr>
<tr><td><code>task/endtask</code></td><td>任务（可含时序）</td></tr></table>`},
  {id:'ref-op',label:'运算符',content:`
<table><tr><th>类别</th><th>运算符</th></tr>
<tr><td>按位</td><td><code>~ & | ^ ~^</code></td></tr>
<tr><td>逻辑</td><td><code>! && ||</code></td></tr>
<tr><td>算术</td><td><code>+ - * / %</code></td></tr>
<tr><td>缩减</td><td><code>& ~& | ~| ^ ~^</code></td></tr>
<tr><td>移位</td><td><code>&lt;&lt; >> &lt;&lt;< >>></code></td></tr>
<tr><td>比较</td><td><code>== != === !== > < >= <=</code></td></tr>
<tr><td>移位拼接</td><td><code>{a,b} {n{a}}</code></td></tr>
<tr><td>条件</td><td><code>? :</code></td></tr></table>`},
  {id:'ref-num',label:'数字格式',content:`
<table><tr><th>格式</th><th>说明</th><th>示例</th></tr>
<tr><td>&lt;size>'b&lt;bits&gt;</td><td>二进制</td><td><code>4'b1010</code></td></tr>
<tr><td>&lt;size>'o&lt;oct&gt;</td><td>八进制</td><td><code>8'o377</code></td></tr>
<tr><td>&lt;size>'d&lt;dec&gt;</td><td>十进制</td><td><code>12'd100</code></td></tr>
<tr><td>&lt;size>'h&lt;hex&gt;</td><td>十六进制</td><td><code>8'h3f</code></td></tr>
<tr><td>1'b0/1'b1/1'bx/1'bz</td><td>1位常量</td><td><code>1'bz</code>（高阻）</td></tr></table>`},
  {id:'ref-dir',label:'编译指令',content:`
<table><tr><th>指令</th><th>作用</th></tr>
<tr><td><code>\`timescale 1ns/1ps</code></td><td>定义时间单位/精度（testbench）</td></tr>
<tr><td><code>\`define A 10</code></td><td>全局宏定义</td></tr>
<tr><td><code>\`include "file.v"</code></td><td>包含文件</td></tr>
<tr><td><code>\`ifdef/\`else/\`endif</code></td><td>条件编译</td></tr></table>`},
  {id:'ref-tb',label:'Testbench',content:`
<table><tr><th>系统任务</th><th>作用</th></tr>
<tr><td><code>$display("fmt",args)</code></td><td>打印（类似printf）</td></tr>
<tr><td><code>$monitor("fmt",args)</code></td><td>信号变化时自动打印</td></tr>
<tr><td><code>$random</code></td><td>返回32位随机数</td></tr>
<tr><td><code>$finish</code></td><td>结束仿真</td></tr>
<tr><td><code>$stop</code></td><td>暂停仿真</td></tr>
<tr><td><code>$dumpfile("f.vcd")</code></td><td>指定波形文件</td></tr>
<tr><td><code>$dumpvars(0,tb)</code></td><td>导出tb及以下所有信号波形</td></tr>
<tr><td><code>#10</code></td><td>延时10个时间单位</td></tr></table>`},
  {id:'ref-rule',label:'黄金法则',content:`
<div class="keypoint"><div class="kp-t">⭐ 时序逻辑</div><p><code>always @(posedge clk or posedge rst)</code>，使用 <strong>非阻塞赋值 &lt;=</strong>。</p></div>
<div class="keypoint"><div class="kp-t">⭐ 组合逻辑</div><p><code>always @(*)</code>，使用 <strong>阻塞赋值 =</strong>，<strong>必须配 default/else</strong>，避免 latch。</p></div>
<div class="keypoint"><div class="kp-t">⭐ 驱动规则</div><p>一个 reg 只能在一个 always 块中赋值；不要在 assign 和 always 中同时驱动同一个信号。</p></div>
<div class="keypoint"><div class="kp-t">⭐ 时钟原则</div><p>尽量用时钟使能（en）方案，不要在内部产生新时钟；异步复位要"异步复位、同步释放"。</p></div>`}
];
