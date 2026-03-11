import { describe, it, expect } from 'vitest';
import { fetchLocationByIp, fetchWeatherData, transformWeatherData } from './api';

// These tests run against either:
//   - WireMock local playback (CI, when IP_API_BASE_URL / WEATHER_API_BASE_URL are set)
//   - Live third-party APIs (local dev, or Stage 3 recording phase)

describe('IP Geolocation API', () => {
  it('returns a successful location response with lat/lon coordinates', async () => {
    const location = await fetchLocationByIp();

    expect(location.status).toBe('success');
    expect(typeof location.lat).toBe('number');
    expect(typeof location.lon).toBe('number');
    expect(location.city).toBeDefined();
    expect(location.country).toBeDefined();
  });
});

describe('Weather API', () => {
  it('returns weather data for London coordinates', async () => {
    // London: a stable, always-valid coordinate pair for recording a representative stub
    const weather = await fetchWeatherData(51.5074, -0.1278);

    expect(weather.location).toBeDefined();
    expect(weather.location.name).toBeDefined();
    expect(weather.current).toBeDefined();
    expect(typeof weather.current.temp_c).toBe('number');
    expect(weather.current.condition).toBeDefined();
    expect(weather.current.condition.text).toBeDefined();
  });

  it('transforms raw weather data into a display-ready format', async () => {
    const raw = await fetchWeatherData(51.5074, -0.1278);
    const display = transformWeatherData(raw);

    expect(display.location).toBeDefined();
    expect(display.country).toBeDefined();
    expect(typeof display.temperature).toBe('number');
    expect(typeof display.humidity).toBe('number');
    expect(display.condition).toBeDefined();
  });
});
