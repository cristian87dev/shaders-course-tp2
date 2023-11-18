uniform vec3 uColor;
uniform float uIterations;

varying vec2 vUv;
varying float vTime;

float sdCircle( vec2 p, float r )
{
    return length(p) - r;
}

float sdBox( in vec2 p, in vec2 b )
{
    vec2 d = abs(p)-b;
    return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
}

float sdRoundedX( in vec2 p, in float w, in float r )
{
    p = abs(p);
    return length(p-min(p.x+p.y,w)*0.5) - r;
}

float sdEquilateralTriangle( in vec2 p, in float r )
{
    const float k = sqrt(3.0);
    p.x = abs(p.x) - r;
    p.y = p.y + r/k;
    if( p.x+k*p.y>0.0 ) {
        p = vec2(p.x-k*p.y,-k*p.x-p.y)/2.0;
    }
    p.x -= clamp( p.x, -2.0*r, 0.0 );
    return -length(p)*sign(p.y);
}

float sdStar5(in vec2 p, in float r, in float rf)
{
    const vec2 k1 = vec2(0.809016994375, -0.587785252292);
    const vec2 k2 = vec2(-k1.x,k1.y);
    p.x = abs(p.x);
    p -= 2.0*max(dot(k1,p),0.0)*k1;
    p -= 2.0*max(dot(k2,p),0.0)*k2;
    p.x = abs(p.x);
    p.y -= r;
    vec2 ba = rf*vec2(-k1.y,k1.x) - vec2(0,1);
    float h = clamp( dot(p,ba)/dot(ba,ba), 0.0, r );
    return length(p-ba*h) * sign(p.y*ba.x-p.x*ba.y);
}

vec3 palette(float t) {
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.263, 0.416, 0.557);

    return a + b * cos(6.28318 * (c * t + d));
}

void main()
{
    vec2 uv = vUv * 2.0 - 1.0;
    vec2 uv0 = uv;
    vec3 finalColor = vec3(0.0);

    for (float i = 0.0; i < uIterations; i++) {
        uv = fract(uv * 1.5) - 0.5;

        // Stakeholder for code replacement
        shape_replacement();

        d = abs(sin(d * 8.0 + vTime * (i + 1.)) / 8.0);

        // Color Intensity
        d = pow(0.02 / d, 1.2);

        finalColor += col * d;
    }
    gl_FragColor = vec4(finalColor, 0.5);
}