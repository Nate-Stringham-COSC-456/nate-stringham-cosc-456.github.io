#version 300 es

precision mediump float;

uniform vec3 uColor;

out vec4 fColor;

void main() {
    fColor = vec4(uColor, 1.0f);
}
