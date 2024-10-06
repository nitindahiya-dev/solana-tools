"use client";
import { cn } from "@/lib/utils";
import React, { useMemo, useEffect, useRef } from "react";

export const CanvasRevealEffect = ({
  animationSpeed = 0.4,
  opacities = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
  colors = [[0, 255, 255]],
  containerClassName,
  dotSize,
  showGradient = true,
}: {
  animationSpeed?: number;
  opacities?: number[];
  colors?: number[][];
  containerClassName?: string;
  dotSize?: number;
  showGradient?: boolean;
}) => {
  return (
    <div className={cn("h-full relative bg-white w-full", containerClassName)}>
      <div className="h-full w-full">
        <DotMatrix
          colors={colors ?? [[0, 255, 255]]}
          dotSize={dotSize ?? 3}
          opacities={opacities ?? [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1]}
          shader={`
              precision mediump float;
              varying vec2 fragCoord;
              uniform float u_time;
              uniform float u_opacities[10];
              uniform vec3 u_colors[6];
              uniform float u_total_size;
              uniform float u_dot_size;
              uniform vec2 u_resolution;
              out vec4 fragColor;

              float PHI = 1.61803398874989484820459;
              float random(vec2 xy) {
                  return fract(tan(distance(xy * PHI, xy) * 0.5) * xy.x);
              }
              
              void main() {
                  vec2 st = fragCoord.xy;
                  st.x -= abs(floor((mod(u_resolution.x, u_total_size) - u_dot_size) * 0.5));
                  st.y -= abs(floor((mod(u_resolution.y, u_total_size) - u_dot_size) * 0.5));

                  float opacity = step(0.0, st.x) * step(0.0, st.y);
                  vec2 st2 = vec2(int(st.x / u_total_size), int(st.y / u_total_size));
                  float frequency = 5.0;
                  float show_offset = random(st2) * 0.15;

                  opacity *= step(u_time * 0.5, show_offset);

                  for (int i = 0; i < 10; i++) {
                      opacity *= step((show_offset + float(i)) * (1.0 / frequency), u_time);
                      fragColor = vec4(u_colors[i % 6] * opacity, opacity);
                  }
                  
                  if (opacity < 0.0) discard;
                  gl_FragColor = fragColor;
              }
            `}
          center={["x", "y"]}
          animationSpeed={animationSpeed}
        />
      </div>
      {showGradient && (
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-[84%]" />
      )}
    </div>
  );
};

interface DotMatrixProps {
  colors?: number[][];
  opacities?: number[];
  totalSize?: number;
  dotSize?: number;
  shader: string;
  center?: ("x" | "y")[];
  animationSpeed?: number;
}

const DotMatrix: React.FC<DotMatrixProps> = ({
  colors = [[0, 0, 0]],
  opacities = [0.04, 0.04, 0.04, 0.04, 0.04, 0.08, 0.08, 0.08, 0.08, 0.14],
  totalSize = 4,
  dotSize = 2,
  shader = "",
  // center = ["x", "y"],
  // animationSpeed = 0.4,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const uniforms = useMemo(() => {
    const colorsArray = colors.map((color) => [
      color[0] / 255,
      color[1] / 255,
      color[2] / 255,
    ]);

    return {
      u_colors: {
        value: colorsArray,
        type: "uniform3fv",
      },
      u_opacities: {
        value: opacities,
        type: "uniform1fv",
      },
      u_total_size: {
        value: totalSize,
        type: "uniform1f",
      },
      u_dot_size: {
        value: dotSize,
        type: "uniform1f",
      },
    };
  }, [colors, opacities, totalSize, dotSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    // Set viewport
    gl.viewport(0, 0, canvas.width, canvas.height);

    // Create and compile vertex shader
    const vertexShaderSource = `
      attribute vec4 position;
      void main() {
          gl_Position = position;
      }
    `;
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    if (vertexShader) {
      gl.shaderSource(vertexShader, vertexShaderSource);
      gl.compileShader(vertexShader);
    }

    // Create and compile fragment shader
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    if (fragmentShader) {
      gl.shaderSource(fragmentShader, shader);
      gl.compileShader(fragmentShader);
    }

    // Create shader program
    const shaderProgram = gl.createProgram();
    if (!shaderProgram) {
      console.error("Failed to create shader program");
      return; // Early return if the shader program creation fails
    }
    
    // Attach shaders to the program
    gl.attachShader(shaderProgram, vertexShader!);
    gl.attachShader(shaderProgram, fragmentShader!);
    gl.linkProgram(shaderProgram);

    // Check for linking errors
    const linkStatus = gl.getProgramParameter(shaderProgram, gl.LINK_STATUS);
    if (!linkStatus) {
      const error = gl.getProgramInfoLog(shaderProgram);
      console.error("Error linking shader program:", error);
      return; // Early return if linking fails
    }

    // Use the program
    gl.useProgram(shaderProgram);

    // Set up vertex data
    const positions = new Float32Array([
      -1, -1,
      1, -1,
      -1, 1,
      1, 1,
    ]);
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(shaderProgram, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Set uniforms
    const timeLocation = gl.getUniformLocation(shaderProgram, "u_time");
    const resolutionLocation = gl.getUniformLocation(shaderProgram, "u_resolution");

    const animate = (time: number) => {
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(timeLocation, time * 0.001);
      gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);

      // Draw the scene
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    return () => {
      gl.deleteProgram(shaderProgram);
      gl.deleteShader(vertexShader!);
      gl.deleteShader(fragmentShader!);
    };
  }, [shader, uniforms]);

  return <canvas ref={canvasRef} className="h-full w-full" />;
};

