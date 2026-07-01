import { describe, expect, it } from 'vitest';
import { MICRO_EXERCISES } from '../src/content';
import { runStaticVerilogCheck } from '../src/lib/verilogCheck';

describe('Verilog static checker', () => {
  it('counts basic Verilog structures', () => {
    const result = runStaticVerilogCheck(`module top(input a, output y);
assign y = a;
endmodule`);

    expect(result.moduleCount).toBe(1);
    expect(result.assignCount).toBe(1);
    expect(result.alwaysCount).toBe(0);
  });

  it('warns about blocking assignment in sequential always blocks', () => {
    const result = runStaticVerilogCheck(`module top(input clk, output reg q);
always @(posedge clk) begin
  q = 1'b1;
end
endmodule`);

    expect(result.warnings.join('\n')).toContain('阻塞赋值');
  });

  it('warns about unclosed modules and begin/end mismatch', () => {
    const result = runStaticVerilogCheck(`module top(input clk, output reg q);
always @(posedge clk) begin
  q <= 1'b1;`);

    expect(result.warnings.join('\n')).toContain('module 与 endmodule 数量不一致');
    expect(result.warnings.join('\n')).toContain('begin 与 end 数量不一致');
  });

  it('compares beginner code with reference-answer keywords', () => {
    const exercise = MICRO_EXERCISES.find((item) => item.id === 'm1');
    expect(exercise).toBeDefined();

    const result = runStaticVerilogCheck(`module top_module(output zero);
endmodule`, exercise);

    expect(result.missingKeywords.length).toBeGreaterThan(0);
  });
});
