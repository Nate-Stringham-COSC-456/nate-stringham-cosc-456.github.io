#version 300 es

in vec4 aPosition;
in vec3 aColor;

out vec3 vColor;

void main() {
    gl_Position = aPosition;
    vColor = aColor;
}
