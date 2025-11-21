"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
const electron = require("electron");
const os = require("os");
const path = require("path");
const net = require("node:net");
/*! noble-secp256k1 - MIT License (c) 2019 Paul Miller (paulmillr.com) */
const secp256k1_CURVE = {
  p: 0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2fn,
  n: 0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141n,
  h: 1n,
  a: 0n,
  b: 7n,
  Gx: 0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798n,
  Gy: 0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8n
};
const { p: P, n: N, Gx, Gy, b: _b } = secp256k1_CURVE;
const L = 32;
const L2 = 64;
const lengths = {
  publicKey: L + 1,
  publicKeyUncompressed: L2 + 1,
  signature: L2,
  seed: L + L / 2
};
const captureTrace = (...args) => {
  if ("captureStackTrace" in Error && typeof Error.captureStackTrace === "function") {
    Error.captureStackTrace(...args);
  }
};
const err = (message = "") => {
  const e = new Error(message);
  captureTrace(e, err);
  throw e;
};
const isBig = (n) => typeof n === "bigint";
const isStr = (s) => typeof s === "string";
const isBytes = (a) => a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
const abytes = (value, length, title = "") => {
  const bytes = isBytes(value);
  const len = value == null ? void 0 : value.length;
  const needsLen = length !== void 0;
  if (!bytes || needsLen && len !== length) {
    const prefix = title && `"${title}" `;
    const ofLen = needsLen ? ` of length ${length}` : "";
    const got = bytes ? `length=${len}` : `type=${typeof value}`;
    err(prefix + "expected Uint8Array" + ofLen + ", got " + got);
  }
  return value;
};
const u8n = (len) => new Uint8Array(len);
const padh = (n, pad) => n.toString(16).padStart(pad, "0");
const bytesToHex = (b) => Array.from(abytes(b)).map((e) => padh(e, 2)).join("");
const C = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
const _ch = (ch) => {
  if (ch >= C._0 && ch <= C._9)
    return ch - C._0;
  if (ch >= C.A && ch <= C.F)
    return ch - (C.A - 10);
  if (ch >= C.a && ch <= C.f)
    return ch - (C.a - 10);
  return;
};
const hexToBytes = (hex) => {
  const e = "hex invalid";
  if (!isStr(hex))
    return err(e);
  const hl = hex.length;
  const al = hl / 2;
  if (hl % 2)
    return err(e);
  const array = u8n(al);
  for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
    const n1 = _ch(hex.charCodeAt(hi));
    const n2 = _ch(hex.charCodeAt(hi + 1));
    if (n1 === void 0 || n2 === void 0)
      return err(e);
    array[ai] = n1 * 16 + n2;
  }
  return array;
};
const cr = () => globalThis == null ? void 0 : globalThis.crypto;
const subtle = () => {
  var _a;
  return ((_a = cr()) == null ? void 0 : _a.subtle) ?? err("crypto.subtle must be defined, consider polyfill");
};
const concatBytes = (...arrs) => {
  const r = u8n(arrs.reduce((sum, a) => sum + abytes(a).length, 0));
  let pad = 0;
  arrs.forEach((a) => {
    r.set(a, pad);
    pad += a.length;
  });
  return r;
};
const randomBytes = (len = L) => {
  const c = cr();
  return c.getRandomValues(u8n(len));
};
const big = BigInt;
const arange = (n, min, max, msg = "bad number: out of range") => isBig(n) && min <= n && n < max ? n : err(msg);
const M = (a, b = P) => {
  const r = a % b;
  return r >= 0n ? r : b + r;
};
const modN = (a) => M(a, N);
const invert = (num, md) => {
  if (num === 0n || md <= 0n)
    err("no inverse n=" + num + " mod=" + md);
  let a = M(num, md), b = md, x = 0n, u = 1n;
  while (a !== 0n) {
    const q = b / a, r = b % a;
    const m = x - u * q;
    b = a, a = r, x = u, u = m;
  }
  return b === 1n ? M(x, md) : err("no inverse");
};
const callHash = (name) => {
  const fn = hashes[name];
  if (typeof fn !== "function")
    err("hashes." + name + " not set");
  return fn;
};
const hash = (msg) => callHash("sha256")(msg);
const apoint = (p) => p instanceof Point ? p : err("Point expected");
const koblitz = (x) => M(M(x * x) * x + _b);
const FpIsValid = (n) => arange(n, 0n, P);
const FpIsValidNot0 = (n) => arange(n, 1n, P);
const FnIsValidNot0 = (n) => arange(n, 1n, N);
const isEven = (y) => (y & 1n) === 0n;
const u8of = (n) => Uint8Array.of(n);
const getPrefix = (y) => u8of(isEven(y) ? 2 : 3);
const lift_x = (x) => {
  const c = koblitz(FpIsValidNot0(x));
  let r = 1n;
  for (let num = c, e = (P + 1n) / 4n; e > 0n; e >>= 1n) {
    if (e & 1n)
      r = r * num % P;
    num = num * num % P;
  }
  return M(r * r) === c ? r : err("sqrt invalid");
};
const _Point = class _Point {
  constructor(X, Y, Z) {
    __publicField(this, "X");
    __publicField(this, "Y");
    __publicField(this, "Z");
    this.X = FpIsValid(X);
    this.Y = FpIsValidNot0(Y);
    this.Z = FpIsValid(Z);
    Object.freeze(this);
  }
  static CURVE() {
    return secp256k1_CURVE;
  }
  /** Create 3d xyz point from 2d xy. (0, 0) => (0, 1, 0), not (0, 0, 1) */
  static fromAffine(ap) {
    const { x, y } = ap;
    return x === 0n && y === 0n ? I : new _Point(x, y, 1n);
  }
  /** Convert Uint8Array or hex string to Point. */
  static fromBytes(bytes) {
    abytes(bytes);
    const { publicKey: comp, publicKeyUncompressed: uncomp } = lengths;
    let p = void 0;
    const length = bytes.length;
    const head = bytes[0];
    const tail = bytes.subarray(1);
    const x = sliceBytesNumBE(tail, 0, L);
    if (length === comp && (head === 2 || head === 3)) {
      let y = lift_x(x);
      const evenY = isEven(y);
      const evenH = isEven(big(head));
      if (evenH !== evenY)
        y = M(-y);
      p = new _Point(x, y, 1n);
    }
    if (length === uncomp && head === 4)
      p = new _Point(x, sliceBytesNumBE(tail, L, L2), 1n);
    return p ? p.assertValidity() : err("bad point: not on curve");
  }
  static fromHex(hex) {
    return _Point.fromBytes(hexToBytes(hex));
  }
  get x() {
    return this.toAffine().x;
  }
  get y() {
    return this.toAffine().y;
  }
  /** Equality check: compare points P&Q. */
  equals(other) {
    const { X: X1, Y: Y1, Z: Z1 } = this;
    const { X: X2, Y: Y2, Z: Z2 } = apoint(other);
    const X1Z2 = M(X1 * Z2);
    const X2Z1 = M(X2 * Z1);
    const Y1Z2 = M(Y1 * Z2);
    const Y2Z1 = M(Y2 * Z1);
    return X1Z2 === X2Z1 && Y1Z2 === Y2Z1;
  }
  is0() {
    return this.equals(I);
  }
  /** Flip point over y coordinate. */
  negate() {
    return new _Point(this.X, M(-this.Y), this.Z);
  }
  /** Point doubling: P+P, complete formula. */
  double() {
    return this.add(this);
  }
  /**
   * Point addition: P+Q, complete, exception-free formula
   * (Renes-Costello-Batina, algo 1 of [2015/1060](https://eprint.iacr.org/2015/1060)).
   * Cost: `12M + 0S + 3*a + 3*b3 + 23add`.
   */
  // prettier-ignore
  add(other) {
    const { X: X1, Y: Y1, Z: Z1 } = this;
    const { X: X2, Y: Y2, Z: Z2 } = apoint(other);
    const a = 0n;
    const b = _b;
    let X3 = 0n, Y3 = 0n, Z3 = 0n;
    const b3 = M(b * 3n);
    let t0 = M(X1 * X2), t1 = M(Y1 * Y2), t2 = M(Z1 * Z2), t3 = M(X1 + Y1);
    let t4 = M(X2 + Y2);
    t3 = M(t3 * t4);
    t4 = M(t0 + t1);
    t3 = M(t3 - t4);
    t4 = M(X1 + Z1);
    let t5 = M(X2 + Z2);
    t4 = M(t4 * t5);
    t5 = M(t0 + t2);
    t4 = M(t4 - t5);
    t5 = M(Y1 + Z1);
    X3 = M(Y2 + Z2);
    t5 = M(t5 * X3);
    X3 = M(t1 + t2);
    t5 = M(t5 - X3);
    Z3 = M(a * t4);
    X3 = M(b3 * t2);
    Z3 = M(X3 + Z3);
    X3 = M(t1 - Z3);
    Z3 = M(t1 + Z3);
    Y3 = M(X3 * Z3);
    t1 = M(t0 + t0);
    t1 = M(t1 + t0);
    t2 = M(a * t2);
    t4 = M(b3 * t4);
    t1 = M(t1 + t2);
    t2 = M(t0 - t2);
    t2 = M(a * t2);
    t4 = M(t4 + t2);
    t0 = M(t1 * t4);
    Y3 = M(Y3 + t0);
    t0 = M(t5 * t4);
    X3 = M(t3 * X3);
    X3 = M(X3 - t0);
    t0 = M(t3 * t1);
    Z3 = M(t5 * Z3);
    Z3 = M(Z3 + t0);
    return new _Point(X3, Y3, Z3);
  }
  subtract(other) {
    return this.add(apoint(other).negate());
  }
  /**
   * Point-by-scalar multiplication. Scalar must be in range 1 <= n < CURVE.n.
   * Uses {@link wNAF} for base point.
   * Uses fake point to mitigate side-channel leakage.
   * @param n scalar by which point is multiplied
   * @param safe safe mode guards against timing attacks; unsafe mode is faster
   */
  multiply(n, safe = true) {
    if (!safe && n === 0n)
      return I;
    FnIsValidNot0(n);
    if (n === 1n)
      return this;
    if (this.equals(G))
      return wNAF(n).p;
    let p = I;
    let f = G;
    for (let d = this; n > 0n; d = d.double(), n >>= 1n) {
      if (n & 1n)
        p = p.add(d);
      else if (safe)
        f = f.add(d);
    }
    return p;
  }
  multiplyUnsafe(scalar) {
    return this.multiply(scalar, false);
  }
  /** Convert point to 2d xy affine point. (X, Y, Z) ∋ (x=X/Z, y=Y/Z) */
  toAffine() {
    const { X: x, Y: y, Z: z } = this;
    if (this.equals(I))
      return { x: 0n, y: 0n };
    if (z === 1n)
      return { x, y };
    const iz = invert(z, P);
    if (M(z * iz) !== 1n)
      err("inverse invalid");
    return { x: M(x * iz), y: M(y * iz) };
  }
  /** Checks if the point is valid and on-curve. */
  assertValidity() {
    const { x, y } = this.toAffine();
    FpIsValidNot0(x);
    FpIsValidNot0(y);
    return M(y * y) === koblitz(x) ? this : err("bad point: not on curve");
  }
  /** Converts point to 33/65-byte Uint8Array. */
  toBytes(isCompressed = true) {
    const { x, y } = this.assertValidity().toAffine();
    const x32b = numTo32b(x);
    if (isCompressed)
      return concatBytes(getPrefix(y), x32b);
    return concatBytes(u8of(4), x32b, numTo32b(y));
  }
  toHex(isCompressed) {
    return bytesToHex(this.toBytes(isCompressed));
  }
};
__publicField(_Point, "BASE");
__publicField(_Point, "ZERO");
let Point = _Point;
const G = new Point(Gx, Gy, 1n);
const I = new Point(0n, 1n, 0n);
Point.BASE = G;
Point.ZERO = I;
const doubleScalarMulUns = (R, u1, u2) => {
  return G.multiply(u1, false).add(R.multiply(u2, false)).assertValidity();
};
const bytesToNumBE = (b) => big("0x" + (bytesToHex(b) || "0"));
const sliceBytesNumBE = (b, from, to) => bytesToNumBE(b.subarray(from, to));
const B256 = 2n ** 256n;
const numTo32b = (num) => hexToBytes(padh(arange(num, 0n, B256), L2));
const secretKeyToScalar = (secretKey) => {
  const num = bytesToNumBE(abytes(secretKey, L, "secret key"));
  return arange(num, 1n, N, "invalid secret key: outside of range");
};
const highS = (n) => n > N >> 1n;
const getPublicKey = (privKey, isCompressed = true) => {
  return G.multiply(secretKeyToScalar(privKey)).toBytes(isCompressed);
};
const isValidSecretKey = (secretKey) => {
  try {
    return !!secretKeyToScalar(secretKey);
  } catch (error) {
    return false;
  }
};
const isValidPublicKey = (publicKey, isCompressed) => {
  const { publicKey: comp, publicKeyUncompressed } = lengths;
  try {
    const l = publicKey.length;
    if (isCompressed === true && l !== comp)
      return false;
    if (isCompressed === false && l !== publicKeyUncompressed)
      return false;
    return !!Point.fromBytes(publicKey);
  } catch (error) {
    return false;
  }
};
const assertRecoveryBit = (recovery) => {
  if (![0, 1, 2, 3].includes(recovery))
    err("recovery id must be valid and present");
};
const assertSigFormat = (format) => {
  if (format != null && !ALL_SIG.includes(format))
    err(`Signature format must be one of: ${ALL_SIG.join(", ")}`);
  if (format === SIG_DER)
    err('Signature format "der" is not supported: switch to noble-curves');
};
const assertSigLength = (sig, format = SIG_COMPACT) => {
  assertSigFormat(format);
  const SL = lengths.signature;
  const RL = SL + 1;
  let msg = `Signature format "${format}" expects Uint8Array with length `;
  if (format === SIG_COMPACT && sig.length !== SL)
    err(msg + SL);
  if (format === SIG_RECOVERED && sig.length !== RL)
    err(msg + RL);
};
class Signature {
  constructor(r, s, recovery) {
    __publicField(this, "r");
    __publicField(this, "s");
    __publicField(this, "recovery");
    this.r = FnIsValidNot0(r);
    this.s = FnIsValidNot0(s);
    if (recovery != null)
      this.recovery = recovery;
    Object.freeze(this);
  }
  static fromBytes(b, format = SIG_COMPACT) {
    assertSigLength(b, format);
    let rec;
    if (format === SIG_RECOVERED) {
      rec = b[0];
      b = b.subarray(1);
    }
    const r = sliceBytesNumBE(b, 0, L);
    const s = sliceBytesNumBE(b, L, L2);
    return new Signature(r, s, rec);
  }
  addRecoveryBit(bit) {
    return new Signature(this.r, this.s, bit);
  }
  hasHighS() {
    return highS(this.s);
  }
  toBytes(format = SIG_COMPACT) {
    const { r, s, recovery } = this;
    const res = concatBytes(numTo32b(r), numTo32b(s));
    if (format === SIG_RECOVERED) {
      assertRecoveryBit(recovery);
      return concatBytes(Uint8Array.of(recovery), res);
    }
    return res;
  }
}
const bits2int = (bytes) => {
  const delta = bytes.length * 8 - 256;
  if (delta > 1024)
    err("msg invalid");
  const num = bytesToNumBE(bytes);
  return delta > 0 ? num >> big(delta) : num;
};
const bits2int_modN = (bytes) => modN(bits2int(abytes(bytes)));
const SIG_COMPACT = "compact";
const SIG_RECOVERED = "recovered";
const SIG_DER = "der";
const ALL_SIG = [SIG_COMPACT, SIG_RECOVERED, SIG_DER];
const defaultSignOpts = {
  lowS: true,
  prehash: true,
  format: SIG_COMPACT,
  extraEntropy: false
};
const _sha = "SHA-256";
const hashes = {
  hmacSha256Async: async (key, message) => {
    const s = subtle();
    const name = "HMAC";
    const k = await s.importKey("raw", key, { name, hash: { name: _sha } }, false, ["sign"]);
    return u8n(await s.sign(name, k, message));
  },
  hmacSha256: void 0,
  sha256Async: async (msg) => u8n(await subtle().digest(_sha, msg)),
  sha256: void 0
};
const prepMsg = (msg, opts, async_) => {
  abytes(msg, void 0, "message");
  if (!opts.prehash)
    return msg;
  return async_ ? hashes.sha256Async(msg) : callHash("sha256")(msg);
};
const NULL = u8n(0);
const byte0 = u8of(0);
const byte1 = u8of(1);
const _maxDrbgIters = 1e3;
const _drbgErr = "drbg: tried max amount of iterations";
const hmacDrbg = (seed, pred) => {
  let v = u8n(L);
  let k = u8n(L);
  let i = 0;
  const reset = () => {
    v.fill(1);
    k.fill(0);
  };
  const h = (...b) => callHash("hmacSha256")(k, concatBytes(v, ...b));
  const reseed = (seed2 = NULL) => {
    k = h(byte0, seed2);
    v = h();
    if (seed2.length === 0)
      return;
    k = h(byte1, seed2);
    v = h();
  };
  const gen = () => {
    if (i++ >= _maxDrbgIters)
      err(_drbgErr);
    v = h();
    return v;
  };
  reset();
  reseed(seed);
  let res = void 0;
  while (!(res = pred(gen())))
    reseed();
  reset();
  return res;
};
const hmacDrbgAsync = async (seed, pred) => {
  let v = u8n(L);
  let k = u8n(L);
  let i = 0;
  const reset = () => {
    v.fill(1);
    k.fill(0);
  };
  const h = (...b) => hashes.hmacSha256Async(k, concatBytes(v, ...b));
  const reseed = async (seed2 = NULL) => {
    k = await h(byte0, seed2);
    v = await h();
    if (seed2.length === 0)
      return;
    k = await h(byte1, seed2);
    v = await h();
  };
  const gen = async () => {
    if (i++ >= _maxDrbgIters)
      err(_drbgErr);
    v = await h();
    return v;
  };
  reset();
  await reseed(seed);
  let res = void 0;
  while (!(res = pred(await gen())))
    await reseed();
  reset();
  return res;
};
const _sign = (messageHash, secretKey, opts, hmacDrbg2) => {
  let { lowS, extraEntropy } = opts;
  const int2octets = numTo32b;
  const h1i = bits2int_modN(messageHash);
  const h1o = int2octets(h1i);
  const d = secretKeyToScalar(secretKey);
  const seedArgs = [int2octets(d), h1o];
  if (extraEntropy != null && extraEntropy !== false) {
    const e = extraEntropy === true ? randomBytes(L) : extraEntropy;
    seedArgs.push(abytes(e, void 0, "extraEntropy"));
  }
  const seed = concatBytes(...seedArgs);
  const m = h1i;
  const k2sig = (kBytes) => {
    const k = bits2int(kBytes);
    if (!(1n <= k && k < N))
      return;
    const ik = invert(k, N);
    const q = G.multiply(k).toAffine();
    const r = modN(q.x);
    if (r === 0n)
      return;
    const s = modN(ik * modN(m + r * d));
    if (s === 0n)
      return;
    let recovery = (q.x === r ? 0 : 2) | Number(q.y & 1n);
    let normS = s;
    if (lowS && highS(s)) {
      normS = modN(-s);
      recovery ^= 1;
    }
    const sig = new Signature(r, normS, recovery);
    return sig.toBytes(opts.format);
  };
  return hmacDrbg2(seed, k2sig);
};
const _verify = (sig, messageHash, publicKey, opts = {}) => {
  const { lowS, format } = opts;
  if (sig instanceof Signature)
    err("Signature must be in Uint8Array, use .toBytes()");
  assertSigLength(sig, format);
  abytes(publicKey, void 0, "publicKey");
  try {
    const { r, s } = Signature.fromBytes(sig, format);
    const h = bits2int_modN(messageHash);
    const P2 = Point.fromBytes(publicKey);
    if (lowS && highS(s))
      return false;
    const is = invert(s, N);
    const u1 = modN(h * is);
    const u2 = modN(r * is);
    const R = doubleScalarMulUns(P2, u1, u2).toAffine();
    const v = modN(R.x);
    return v === r;
  } catch (error) {
    return false;
  }
};
const setDefaults = (opts) => {
  const res = {};
  Object.keys(defaultSignOpts).forEach((k) => {
    res[k] = opts[k] ?? defaultSignOpts[k];
  });
  return res;
};
const sign = (message, secretKey, opts = {}) => {
  opts = setDefaults(opts);
  message = prepMsg(message, opts, false);
  return _sign(message, secretKey, opts, hmacDrbg);
};
const signAsync = async (message, secretKey, opts = {}) => {
  opts = setDefaults(opts);
  message = await prepMsg(message, opts, true);
  return _sign(message, secretKey, opts, hmacDrbgAsync);
};
const verify = (signature, message, publicKey, opts = {}) => {
  opts = setDefaults(opts);
  message = prepMsg(message, opts, false);
  return _verify(signature, message, publicKey, opts);
};
const verifyAsync = async (sig, message, publicKey, opts = {}) => {
  opts = setDefaults(opts);
  message = await prepMsg(message, opts, true);
  return _verify(sig, message, publicKey, opts);
};
const _recover = (signature, messageHash) => {
  const sig = Signature.fromBytes(signature, "recovered");
  const { r, s, recovery } = sig;
  assertRecoveryBit(recovery);
  const h = bits2int_modN(abytes(messageHash, L));
  const radj = recovery === 2 || recovery === 3 ? r + N : r;
  FpIsValidNot0(radj);
  const head = getPrefix(big(recovery));
  const Rb = concatBytes(head, numTo32b(radj));
  const R = Point.fromBytes(Rb);
  const ir = invert(radj, N);
  const u1 = modN(-h * ir);
  const u2 = modN(s * ir);
  const point = doubleScalarMulUns(R, u1, u2);
  return point.toBytes();
};
const recoverPublicKey = (signature, message, opts = {}) => {
  message = prepMsg(message, setDefaults(opts), false);
  return _recover(signature, message);
};
const recoverPublicKeyAsync = async (signature, message, opts = {}) => {
  message = await prepMsg(message, setDefaults(opts), true);
  return _recover(signature, message);
};
const getSharedSecret = (secretKeyA, publicKeyB, isCompressed = true) => {
  return Point.fromBytes(publicKeyB).multiply(secretKeyToScalar(secretKeyA)).toBytes(isCompressed);
};
const randomSecretKey = (seed = randomBytes(lengths.seed)) => {
  abytes(seed);
  if (seed.length < lengths.seed || seed.length > 1024)
    err("expected 40-1024b");
  const num = M(bytesToNumBE(seed), N - 1n);
  return numTo32b(num + 1n);
};
const createKeygen = (getPublicKey2) => (seed) => {
  const secretKey = randomSecretKey(seed);
  return { secretKey, publicKey: getPublicKey2(secretKey) };
};
const keygen = createKeygen(getPublicKey);
const etc = {
  hexToBytes,
  bytesToHex,
  concatBytes,
  bytesToNumberBE: bytesToNumBE,
  numberToBytesBE: numTo32b,
  mod: M,
  invert,
  // math utilities
  randomBytes,
  secretKeyToScalar,
  abytes
};
const utils = {
  isValidSecretKey,
  isValidPublicKey,
  randomSecretKey
};
const getTag = (tag) => Uint8Array.from("BIP0340/" + tag, (c) => c.charCodeAt(0));
const T_AUX = "aux";
const T_NONCE = "nonce";
const T_CHALLENGE = "challenge";
const taggedHash = (tag, ...messages) => {
  const fn = callHash("sha256");
  const tagH = fn(getTag(tag));
  return fn(concatBytes(tagH, tagH, ...messages));
};
const taggedHashAsync = async (tag, ...messages) => {
  const fn = hashes.sha256Async;
  const tagH = await fn(getTag(tag));
  return await fn(concatBytes(tagH, tagH, ...messages));
};
const extpubSchnorr = (priv) => {
  const d_ = secretKeyToScalar(priv);
  const p = G.multiply(d_);
  const { x, y } = p.assertValidity().toAffine();
  const d = isEven(y) ? d_ : modN(-d_);
  const px = numTo32b(x);
  return { d, px };
};
const bytesModN = (bytes) => modN(bytesToNumBE(bytes));
const challenge = (...args) => bytesModN(taggedHash(T_CHALLENGE, ...args));
const challengeAsync = async (...args) => bytesModN(await taggedHashAsync(T_CHALLENGE, ...args));
const pubSchnorr = (secretKey) => {
  return extpubSchnorr(secretKey).px;
};
const keygenSchnorr = createKeygen(pubSchnorr);
const prepSigSchnorr = (message, secretKey, auxRand) => {
  const { px, d } = extpubSchnorr(secretKey);
  return { m: abytes(message), px, d, a: abytes(auxRand, L) };
};
const extractK = (rand) => {
  const k_ = bytesModN(rand);
  if (k_ === 0n)
    err("sign failed: k is zero");
  const { px, d } = extpubSchnorr(numTo32b(k_));
  return { rx: px, k: d };
};
const createSigSchnorr = (k, px, e, d) => {
  return concatBytes(px, numTo32b(modN(k + e * d)));
};
const E_INVSIG = "invalid signature produced";
const signSchnorr = (message, secretKey, auxRand = randomBytes(L)) => {
  const { m, px, d, a } = prepSigSchnorr(message, secretKey, auxRand);
  const aux = taggedHash(T_AUX, a);
  const t = numTo32b(d ^ bytesToNumBE(aux));
  const rand = taggedHash(T_NONCE, t, px, m);
  const { rx, k } = extractK(rand);
  const e = challenge(rx, px, m);
  const sig = createSigSchnorr(k, rx, e, d);
  if (!verifySchnorr(sig, m, px))
    err(E_INVSIG);
  return sig;
};
const signSchnorrAsync = async (message, secretKey, auxRand = randomBytes(L)) => {
  const { m, px, d, a } = prepSigSchnorr(message, secretKey, auxRand);
  const aux = await taggedHashAsync(T_AUX, a);
  const t = numTo32b(d ^ bytesToNumBE(aux));
  const rand = await taggedHashAsync(T_NONCE, t, px, m);
  const { rx, k } = extractK(rand);
  const e = await challengeAsync(rx, px, m);
  const sig = createSigSchnorr(k, rx, e, d);
  if (!await verifySchnorrAsync(sig, m, px))
    err(E_INVSIG);
  return sig;
};
const callSyncAsyncFn = (res, later) => {
  return res instanceof Promise ? res.then(later) : later(res);
};
const _verifSchnorr = (signature, message, publicKey, challengeFn) => {
  const sig = abytes(signature, L2, "signature");
  const msg = abytes(message, void 0, "message");
  const pub = abytes(publicKey, L, "publicKey");
  try {
    const x = bytesToNumBE(pub);
    const y = lift_x(x);
    const y_ = isEven(y) ? y : M(-y);
    const P_ = new Point(x, y_, 1n).assertValidity();
    const px = numTo32b(P_.toAffine().x);
    const r = sliceBytesNumBE(sig, 0, L);
    arange(r, 1n, P);
    const s = sliceBytesNumBE(sig, L, L2);
    arange(s, 1n, N);
    const i = concatBytes(numTo32b(r), px, msg);
    return callSyncAsyncFn(challengeFn(i), (e) => {
      const { x: x2, y: y2 } = doubleScalarMulUns(P_, s, modN(-e)).toAffine();
      if (!isEven(y2) || x2 !== r)
        return false;
      return true;
    });
  } catch (error) {
    return false;
  }
};
const verifySchnorr = (s, m, p) => _verifSchnorr(s, m, p, challenge);
const verifySchnorrAsync = async (s, m, p) => _verifSchnorr(s, m, p, challengeAsync);
const schnorr = {
  keygen: keygenSchnorr,
  getPublicKey: pubSchnorr,
  sign: signSchnorr,
  verify: verifySchnorr,
  signAsync: signSchnorrAsync,
  verifyAsync: verifySchnorrAsync
};
const W = 8;
const scalarBits = 256;
const pwindows = Math.ceil(scalarBits / W) + 1;
const pwindowSize = 2 ** (W - 1);
const precompute = () => {
  const points = [];
  let p = G;
  let b = p;
  for (let w = 0; w < pwindows; w++) {
    b = p;
    points.push(b);
    for (let i = 1; i < pwindowSize; i++) {
      b = b.add(p);
      points.push(b);
    }
    p = b.double();
  }
  return points;
};
let Gpows = void 0;
const ctneg = (cnd, p) => {
  const n = p.negate();
  return cnd ? n : p;
};
const wNAF = (n) => {
  const comp = Gpows || (Gpows = precompute());
  let p = I;
  let f = G;
  const pow_2_w = 2 ** W;
  const maxNum = pow_2_w;
  const mask = big(pow_2_w - 1);
  const shiftBy = big(W);
  for (let w = 0; w < pwindows; w++) {
    let wbits = Number(n & mask);
    n >>= shiftBy;
    if (wbits > pwindowSize) {
      wbits -= maxNum;
      n += 1n;
    }
    const off = w * pwindowSize;
    const offF = off;
    const offP = off + Math.abs(wbits) - 1;
    const isEven2 = w % 2 !== 0;
    const isNeg = wbits < 0;
    if (wbits === 0) {
      f = f.add(ctneg(isEven2, comp[offF]));
    } else {
      p = p.add(ctneg(isNeg, comp[offP]));
    }
  }
  if (n !== 0n)
    err("invalid wnaf");
  return { p, f };
};
const secp256k1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Point,
  Signature,
  etc,
  getPublicKey,
  getSharedSecret,
  hash,
  hashes,
  keygen,
  recoverPublicKey,
  recoverPublicKeyAsync,
  schnorr,
  sign,
  signAsync,
  utils,
  verify,
  verifyAsync
}, Symbol.toStringTag, { value: "Module" }));
async function isPortReachable(port, { host, timeout = 1e3 } = {}) {
  if (typeof host !== "string") {
    throw new TypeError("Specify a `host`");
  }
  const promise = new Promise((resolve, reject) => {
    const socket = new net.Socket();
    const onError = () => {
      socket.destroy();
      reject();
    };
    socket.setTimeout(timeout);
    socket.once("error", onError);
    socket.once("timeout", onError);
    socket.connect(port, host, () => {
      socket.end();
      resolve();
    });
  });
  try {
    await promise;
    return true;
  } catch {
    return false;
  }
}
const moment = require("moment");
const base32 = require("rfc-3548-b32");
const crypto = require("crypto-browserify");
const qr = require("qrcode");
const sha3_256 = require("js-sha3").sha3_256;
const ps = require("ps-node");
const fs = require("fs");
const homedir = os.homedir();
require("app-root-dir");
const ewalletPath = path.join(homedir, ".epic");
const logDir = path.join(ewalletPath, "log");
const resourcePath = path.join(__dirname, "../../resources/");
let logFile = `${moment(/* @__PURE__ */ new Date()).format("YYYY_MM_D")}.log`;
path.join(logDir, logFile);
const spawn = require("child_process").spawn;
require("child_process").fork;
const exec = require("child_process").exec;
require("child_process").execFile;
const validChannels = ["firstscan-stdout", "scan-stdout", "scan-finish", "scan-error", "walletExisted", "walletCreated", "walletCreateFailed", "nodeBackground", "epicboxBackground"];
electron.contextBridge.exposeInMainWorld("nodeChildProcess", {
  async kill(pid) {
    return new Promise(function(resolve, reject) {
      if (process.platform === "win32") {
        exec(`taskkill /pid ${pid} /f /t`, function(err2) {
          if (err2) {
            resolve(false);
          } else {
            resolve(true);
          }
        });
      } else {
        ps.kill(pid, { timeout: 3 }, function(err2) {
          if (err2) {
            resolve(false);
          } else {
            resolve(true);
          }
        });
      }
    });
  },
  async spawn(cmd, args) {
    const child = await spawn(cmd, args);
    child.stdout.setEncoding("utf8");
    child.stdout.on("data", function(data2) {
    });
    return child;
  },
  async execNew(cmd, args, platform, password) {
    return new Promise(function(resolve, reject) {
      let createProcess = spawn(cmd, args, { shell: platform == "win" ? true : false });
      let newSeedData = "";
      let errorData = "";
      let recordData = false;
      createProcess.stdout.setEncoding("utf8");
      createProcess.stdout.on("data", (data2) => {
        if (data2.includes("Please back-up these words in a non-digital format.") || recordData) {
          recordData = true;
          newSeedData += data2;
        }
      });
      createProcess.stderr.setEncoding("utf8");
      createProcess.stderr.on("data", (data2) => {
        errorData += data2;
      });
      createProcess.stdout.on("end", function() {
        if (errorData != "") {
          resolve({ success: false, msg: errorData });
        } else if (newSeedData != "") {
          let match = newSeedData.match(/Your recovery phrase is:\s*([\s\S]*?)\s*Please back-up these words in a non-digital format\./);
          let wordSeed = match ? match[1].trim() : "";
          resolve({ success: true, msg: wordSeed });
        } else {
          resolve({ success: false, msg: "unknow error" });
        }
      });
    });
  },
  async execScan(cmd, args, platform, password) {
    return new Promise(function(resolve, reject) {
      let scanProcess = spawn(cmd, args, { shell: platform == "win" ? true : false });
      scanProcess.stdout.setEncoding("utf8");
      scanProcess.stdout.on("data", function(data2) {
        if (data2.includes("Password:")) {
          scanProcess.stdin.write(password + "\n");
        }
        electron.ipcRenderer.send("scan-stdout", data2);
      });
      scanProcess.stderr.setEncoding("utf8");
      scanProcess.stderr.on("data", function(data2) {
        electron.ipcRenderer.send("scan-stdout", data2);
      });
      scanProcess.on("close", function(code) {
        if (code == 0) {
          electron.ipcRenderer.send("scan-finish");
        }
        if (code == 1) {
          electron.ipcRenderer.send("scan-error");
        }
      });
    });
  },
  on: (channel, func) => {
    if (validChannels.includes(channel)) {
      electron.ipcRenderer.on(channel, (event, data2) => func(data2));
    }
  },
  /* start node api */
  async execNode(cmd, args, platform) {
    return new Promise(function(resolve, reject) {
      let node_server = spawn(cmd, args, { shell: platform == "win" ? true : false });
      node_server.stdout.setEncoding("utf8");
      node_server.stdout.on("data", (data2) => {
        if (data2.includes("Epic node server started.")) {
          resolve(node_server.pid);
        }
      });
      node_server.stderr.setEncoding("utf8");
      node_server.stderr.on("data", (data2) => {
        reject(false);
      });
    });
  },
  /* start ngrok */
  async execNgrok(cmd, args, platform) {
    return new Promise(function(resolve, reject) {
      let ngrok = spawn(cmd, args, { shell: platform == "win" ? true : false });
      ngrok.stdout.setEncoding("utf8");
      ngrok.stdout.on("data", (data2) => {
        if (data2.includes("client session established")) {
          resolve({ success: true, msg: ngrok.pid });
        }
        if (data2.includes("ERR_NGROK_107")) {
          resolve({ success: false, msg: "The authtoken you specified is properly formed, but it is invalid." });
        }
      });
      ngrok.stderr.setEncoding("utf8");
      ngrok.stderr.on("data", (data2) => {
        resolve({ success: false, msg: data2 });
      });
    });
  },
  /* start wallet api */
  async execStart(cmd, args, platform, emitOutput) {
    return new Promise(function(resolve, reject) {
      let ownerAPI = spawn(cmd, args, { shell: platform == "win" ? true : false });
      ownerAPI.stdout.setEncoding("utf8");
      ownerAPI.stdout.on("data", (data2) => {
        if (emitOutput) {
          electron.ipcRenderer.send("firstscan-stdout", data2);
        }
        if (data2.includes("HTTP Owner listener started") || data2.includes("Owner API started")) {
          resolve(ownerAPI.pid);
        }
        if (data2.includes("Error opening wallet")) {
          resolve(0);
        }
      });
      ownerAPI.stderr.setEncoding("utf8");
      ownerAPI.stderr.on("data", (data2) => {
        if (emitOutput) {
          electron.ipcRenderer.send("firstscan-stdout", data2);
        }
        if (data2.includes("Address already in use")) {
          resolve(0);
        } else {
          resolve(false);
        }
      });
    });
  },
  /* start wallet listen */
  async execListen(cmd, args, platform, password) {
    return new Promise(function(resolve, reject) {
      let listenProcess = spawn(cmd, args, { shell: platform == "win" ? true : false });
      let isTorBooted2 = false;
      listenProcess.stdout.setEncoding("utf8");
      listenProcess.stdout.on("data", (data2) => {
        if (data2.includes("Password:")) {
          listenProcess.stdin.write(password + "\n");
        }
        if (data2.includes("[notice] Bootstrapped 100% (done): Done")) {
          isTorBooted2 = true;
        }
        if (data2.includes("Unable to start TOR listener") || data2.includes("Tor Error: Tor Process Error: Timeout")) {
          isTorBooted2 = false;
        }
        if (data2.includes("HTTP Foreign listener started.")) {
          resolve({ success: true, msg: listenProcess.pid, tor: isTorBooted2 });
        }
        if (data2.includes("Failed to check node sync status")) {
          resolve({ success: false, msg: "node not synced", tor: isTorBooted2 });
        }
      });
      listenProcess.stderr.setEncoding("utf8");
      listenProcess.stderr.on("data", (data2) => {
        resolve({ success: false, msg: data2, tor: isTorBooted2 });
      });
    });
  },
  /* start wallet epicbox */
  async execEpicbox(cmd, args, platform, password) {
    return new Promise(function(resolve, reject) {
      let listenProcess = spawn(cmd, args, { shell: platform == "win" ? true : false });
      listenProcess.stdout.setEncoding("utf8");
      listenProcess.stdout.on("data", (data2) => {
        if (data2.includes("Password:")) {
          listenProcess.stdin.write(password + "\n");
        }
        if (data2.includes("Starting epicbox listener") || data2.includes("Epicbox listener started.")) {
          resolve({ success: true, msg: listenProcess.pid });
        }
        if (data2.includes("Failed to check node sync status")) {
          resolve({ success: false, msg: "node not synced", tor: isTorBooted });
        }
      });
      listenProcess.stderr.setEncoding("utf8");
      listenProcess.stderr.on("data", (data2) => {
        resolve({ success: false, msg: data2 });
      });
    });
  },
  async execRecover(cmd, args, platform, seeds, password) {
    return new Promise(function(resolve, reject) {
      let recover = spawn(cmd, args, { shell: platform == "win" ? true : false });
      let newSeedData = "";
      let errorData = "";
      let recordData = false;
      recover.stdout.setEncoding("utf8");
      recover.stdout.on("data", (data2) => {
        if (data2.includes("Password:")) {
          recover.stdin.write(password + "\n");
        }
        if (data2.includes("Please enter your recovery phrase")) {
          recover.stdin.write(seeds + "\n");
        } else {
          if (data2.includes("Your recovery phrase is:") || recordData) {
            recordData = true;
            newSeedData += data2;
          }
        }
      });
      recover.stderr.setEncoding("utf8");
      recover.stderr.on("data", (data2) => {
        errorData += data2;
        if (data2.includes("Recovery word phrase is invalid.")) {
          recover.stdin.pause();
          recover.kill();
          resolve({ success: false, msg: errorData });
        }
      });
      recover.stdout.on("end", function() {
        if (errorData != "") {
          resolve({ success: false, msg: errorData });
        } else if (newSeedData != "") {
          let wordSeed = newSeedData;
          wordSeed = wordSeed.replace("Your recovery phrase is:", "");
          wordSeed = wordSeed.replace("Please back-up these words in a non-digital format.", "");
          wordSeed = wordSeed.replace("Command 'init' completed successfully", "");
          wordSeed = wordSeed.replace(/(\r\n|\n|\r)/gm, "");
          wordSeed = wordSeed.replace("wallet.seed", "wallet.seed ==   ");
          let wordSeedWithLog = wordSeed;
          let wordSeedWithoutLog = wordSeedWithLog.substring(wordSeedWithLog.indexOf("==") + 1);
          wordSeedWithoutLog = wordSeedWithoutLog.trim();
          wordSeedWithoutLog = wordSeedWithoutLog.replace("= ", "").trim();
          resolve({ success: true, msg: wordSeedWithoutLog });
        } else {
          resolve({ success: false, msg: "unknow error" });
        }
      });
    });
  }
});
const aes256gcm = (shared_secret) => {
  const ALGO = "aes-256-gcm";
  const encrypt = (str, nonce) => {
    let key = Buffer.from(shared_secret, "hex");
    const cipher = crypto.createCipheriv(ALGO, key, nonce);
    const enc = Buffer.concat([cipher.update(str, "utf8"), cipher.final()]);
    const tag = cipher.getAuthTag();
    return Buffer.concat([enc, tag]).toString("base64");
  };
  const decrypt = (enc, nonce) => {
    let key = Buffer.from(shared_secret, "hex");
    const data_ = Buffer.from(enc, "base64");
    const decipher = crypto.createDecipheriv(ALGO, key, nonce);
    const len = data_.length;
    const tag = data_.slice(len - 16, len);
    const text = data_.slice(0, len - 16);
    decipher.setAuthTag(tag);
    const dec = decipher.update(text, "binary", "utf8") + decipher.final("utf8");
    return dec;
  };
  return {
    encrypt,
    decrypt
  };
};
electron.contextBridge.exposeInMainWorld("nodeFindProcess", require("find-process"));
electron.contextBridge.exposeInMainWorld("nodeCrypto", require("crypto"));
electron.contextBridge.exposeInMainWorld("nodeSecp256k1", secp256k1);
electron.contextBridge.exposeInMainWorld("nodeAes256gcm", aes256gcm);
electron.contextBridge.exposeInMainWorld("nodeSpawnSync", require("child_process").spawnSync);
electron.contextBridge.exposeInMainWorld("nodeSpawn", require("child_process").spawn);
electron.contextBridge.exposeInMainWorld("nodeExec", require("child_process").exec);
electron.contextBridge.exposeInMainWorld("nodeExecSync", require("child_process").execSync);
electron.contextBridge.exposeInMainWorld("nodeExecFile", require("child_process").execFile);
electron.contextBridge.exposeInMainWorld("clipboard", electron.clipboard);
electron.contextBridge.exposeInMainWorld("log", "log");
electron.contextBridge.exposeInMainWorld("debug", "debug");
electron.contextBridge.exposeInMainWorld("nodeFs", fs);
electron.contextBridge.exposeInMainWorld("nodeFsExtra", require("fs-extra"));
electron.contextBridge.exposeInMainWorld("nodeQr", qr);
electron.contextBridge.exposeInMainWorld("nodePath", require("path"));
electron.contextBridge.exposeInMainWorld("config", {
  async isPortReachable(host, port) {
    return await isPortReachable(port, { host });
  },
  async getPublicIp() {
    let response = await fetch("https://api.ipify.org?format=json", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(function(res) {
      if (!res.ok) {
        throw Error(res);
      }
      return res.json();
    }).catch(function(error) {
      return false;
    });
    return response;
  },
  async getPrice() {
    let response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=epic-cash", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(function(res) {
      if (!res.ok) {
        throw Error(res);
      }
      return res.json();
    }).catch(function(error) {
      return false;
    });
    return response;
  },
  getResourcePath() {
    return resourcePath;
  },
  getUserHomedir() {
    return homedir;
  },
  getPlatform() {
    switch (os.platform()) {
      case "aix":
      case "freebsd":
      case "linux":
      case "openbsd":
      case "android":
        return "linux";
      case "darwin":
      case "sunos":
        return "mac";
      case "win32":
        return "win";
    }
  },
  getArch() {
    return os.arch();
  },
  getOnionV3(address) {
    const chekcsumstr = Buffer.from(".onion checksum", "utf8");
    const onion_version = Buffer.from("03", "hex");
    let pubKey = Buffer.from(address, "hex");
    let checksum = Buffer.from(sha3_256.create().update(Buffer.concat([chekcsumstr, pubKey, onion_version])).digest()).slice(0, 2);
    return base32.encode(Buffer.concat([pubKey, checksum, onion_version])).toLowerCase();
  }
});
electron.contextBridge.exposeInMainWorld("explorer", {
  //can be block height or commit
  open(data2) {
    electron.shell.openExternal("https://explorer.epic.tech/blockdetail/" + data2);
  }
});
electron.contextBridge.exposeInMainWorld("openlink", {
  //can be block height or commit
  open(url) {
    electron.shell.openExternal(url);
  }
});
electron.contextBridge.exposeInMainWorld("openepichidden", {
  open(user_homedir = "") {
    let dir = path.join(homedir, ".epic");
    if (user_homedir != "") {
      dir = user_homedir;
    }
    electron.shell.openPath(dir);
  }
});
electron.contextBridge.exposeInMainWorld("api", {
  showSaveDialog: async (title, message, defaultPath) => {
    return await electron.ipcRenderer.invoke("show-save-dialog", title, message, defaultPath);
  },
  showOpenDialog: async () => {
    return await electron.ipcRenderer.invoke("show-open-dialog");
  },
  quit: () => {
    electron.ipcRenderer.invoke("quit");
  },
  resize: (width, height) => {
    electron.ipcRenderer.invoke("resize", width, height);
  },
  locale: async () => {
    return await electron.ipcRenderer.invoke("locale");
  },
  version: async () => {
    return await electron.ipcRenderer.invoke("version");
  },
  nodebackground: (nodebackground) => {
    electron.ipcRenderer.send("nodeBackground", nodebackground);
  },
  epicboxbackground: (epicboxbackground) => {
    electron.ipcRenderer.send("epicboxBackground", epicboxbackground);
  }
});
