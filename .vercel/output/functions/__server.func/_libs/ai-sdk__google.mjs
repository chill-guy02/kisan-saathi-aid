import { At as looseObject, Bt as InvalidArgumentError, C as createJsonResponseHandler, D as delay, E as createProviderStreamError, Ft as string, G as isRecord, Gt as UnsupportedFunctionalityError, Ht as InvalidResponseDataError, I as getTopLevelMediaType, It as union, J as lazySchema, K as isSameOrigin, L as isAbortError, Lt as unknown, M as generateId, Mt as number, N as getFromApi, Nt as object, P as getRuntimeEnvironmentUserAgent, Pt as record, Q as normalizeBatchRequestCounts, Rt as AISDKError, S as createJsonLinesResponseHandler, T as createProviderExecutedToolFactory, Tt as boolean, Ut as TooManyEmbeddingValuesForCallError, V as isFullMediaType, X as mapReasoningToProviderBudget, Y as loadApiKey, Z as mapReasoningToProviderEffort, _ as convertToBase64, _t as withoutTrailingSlash, at as resolve, bt as WORKFLOW_SERIALIZE, dt as secureJsonParse, f as combineHeaders, ft as serializeModelOptions, g as convertInlineFileDataToUint8Array, gt as withUserAgentSuffix, h as convertBase64ToUint8Array, ht as waitForWebSocketBufferDrain, kt as literal, lt as safeParseJSON, m as convertAsyncIteratorToReadableStream, nt as postJsonToApi, ot as resolveFullMediaType, p as connectToWebSocket, rt as postToApi, st as resolveProviderReference, tt as parseProviderOptions, ut as safeValidateTypes, v as convertUint8ArrayToBase64, vt as zodSchema, w as createNullLanguageModelUsage, wt as array, x as createJsonErrorResponseHandler, xt as _enum, y as createEventSourceResponseHandler, yt as WORKFLOW_DESERIALIZE, z as isCustomReasoning } from "./@ai-sdk/gateway+[...].mjs";
//#region node_modules/@ai-sdk/google/dist/index.js
var VERSION = "4.0.56";
var googleErrorDataSchema = lazySchema(() => zodSchema(object({ error: object({
	code: number().nullable(),
	message: string(),
	status: string(),
	details: array(unknown()).nullish()
}) })));
var googleFailedResponseHandler = createJsonErrorResponseHandler({
	errorSchema: googleErrorDataSchema,
	errorToMessage: (data) => data.error.message
});
var googleEmbeddingContentPartSchema = union([
	object({ text: string() }),
	object({ inlineData: object({
		mimeType: string(),
		data: string()
	}) }),
	object({ fileData: object({
		fileUri: string(),
		mimeType: string()
	}) })
]);
var googleEmbeddingModelOptions = lazySchema(() => zodSchema(object({
	/**
	* Optional. Optional reduced dimension for the output embedding.
	* If set, excessive values in the output embedding are truncated from the end.
	*/
	outputDimensionality: number().optional(),
	/**
	* Optional. Specifies the task type for generating embeddings.
	* Supported task types:
	* - SEMANTIC_SIMILARITY: Optimized for text similarity.
	* - CLASSIFICATION: Optimized for text classification.
	* - CLUSTERING: Optimized for clustering texts based on similarity.
	* - RETRIEVAL_DOCUMENT: Optimized for document retrieval.
	* - RETRIEVAL_QUERY: Optimized for query-based retrieval.
	* - QUESTION_ANSWERING: Optimized for answering questions.
	* - FACT_VERIFICATION: Optimized for verifying factual information.
	* - CODE_RETRIEVAL_QUERY: Optimized for retrieving code blocks based on natural language queries.
	*/
	taskType: _enum([
		"SEMANTIC_SIMILARITY",
		"CLASSIFICATION",
		"CLUSTERING",
		"RETRIEVAL_DOCUMENT",
		"RETRIEVAL_QUERY",
		"QUESTION_ANSWERING",
		"FACT_VERIFICATION",
		"CODE_RETRIEVAL_QUERY"
	]).optional(),
	/**
	* Optional. Per-value multimodal content parts for embedding non-text
	* content (images, video, PDF, audio). Each entry corresponds to the
	* embedding value at the same index and its parts are merged with the
	* text value in the request. Use `null` for entries that are text-only.
	*
	* The array length must match the number of values being embedded. In
	* the case of a single embedding, the array length must be 1.
	*/
	content: array(array(googleEmbeddingContentPartSchema).min(1).nullable()).optional()
})));
var GoogleEmbeddingModel = class _GoogleEmbeddingModel {
	constructor(modelId, config) {
		this.specificationVersion = "v4";
		this.maxEmbeddingsPerCall = 100;
		this.supportsParallelCalls = true;
		this.modelId = modelId;
		this.config = config;
	}
	static [WORKFLOW_SERIALIZE](model) {
		return serializeModelOptions({
			modelId: model.modelId,
			config: model.config
		});
	}
	static [WORKFLOW_DESERIALIZE](options) {
		return new _GoogleEmbeddingModel(options.modelId, options.config);
	}
	get provider() {
		return this.config.provider;
	}
	async doEmbed({ values, headers, abortSignal, providerOptions }) {
		const googleOptions = await parseProviderOptions({
			provider: "google",
			providerOptions,
			schema: googleEmbeddingModelOptions
		});
		if (values.length > this.maxEmbeddingsPerCall) throw new TooManyEmbeddingValuesForCallError({
			provider: this.provider,
			modelId: this.modelId,
			maxEmbeddingsPerCall: this.maxEmbeddingsPerCall,
			values
		});
		const mergedHeaders = combineHeaders(this.config.headers ? await resolve(this.config.headers) : void 0, headers);
		const multimodalContent = googleOptions == null ? void 0 : googleOptions.content;
		if (multimodalContent != null && multimodalContent.length !== values.length) throw new Error(`The number of multimodal content entries (${multimodalContent.length}) must match the number of values (${values.length}).`);
		if (values.length === 1) {
			const valueParts = multimodalContent == null ? void 0 : multimodalContent[0];
			const textPart = values[0] ? [{ text: values[0] }] : [];
			const parts = valueParts != null ? [...textPart, ...valueParts] : [{ text: values[0] }];
			const { responseHeaders: responseHeaders2, value: response2, rawValue: rawValue2 } = await postJsonToApi({
				url: `${this.config.baseURL}/models/${this.modelId}:embedContent`,
				headers: mergedHeaders,
				body: {
					model: `models/${this.modelId}`,
					content: { parts },
					outputDimensionality: googleOptions == null ? void 0 : googleOptions.outputDimensionality,
					taskType: googleOptions == null ? void 0 : googleOptions.taskType
				},
				failedResponseHandler: googleFailedResponseHandler,
				successfulResponseHandler: createJsonResponseHandler(googleGenerativeAISingleEmbeddingResponseSchema),
				abortSignal,
				fetch: this.config.fetch
			});
			return {
				warnings: [],
				embeddings: [response2.embedding.values],
				usage: void 0,
				response: {
					headers: responseHeaders2,
					body: rawValue2
				}
			};
		}
		const { responseHeaders, value: response, rawValue } = await postJsonToApi({
			url: `${this.config.baseURL}/models/${this.modelId}:batchEmbedContents`,
			headers: mergedHeaders,
			body: { requests: values.map((value, index) => {
				const valueParts = multimodalContent == null ? void 0 : multimodalContent[index];
				const textPart = value ? [{ text: value }] : [];
				return {
					model: `models/${this.modelId}`,
					content: {
						role: "user",
						parts: valueParts != null ? [...textPart, ...valueParts] : [{ text: value }]
					},
					outputDimensionality: googleOptions == null ? void 0 : googleOptions.outputDimensionality,
					taskType: googleOptions == null ? void 0 : googleOptions.taskType
				};
			}) },
			failedResponseHandler: googleFailedResponseHandler,
			successfulResponseHandler: createJsonResponseHandler(googleGenerativeAITextEmbeddingResponseSchema),
			abortSignal,
			fetch: this.config.fetch
		});
		return {
			warnings: [],
			embeddings: response.embeddings.map((item) => item.values),
			usage: void 0,
			response: {
				headers: responseHeaders,
				body: rawValue
			}
		};
	}
};
var googleGenerativeAITextEmbeddingResponseSchema = lazySchema(() => zodSchema(object({ embeddings: array(object({ values: array(number()) })) })));
var googleGenerativeAISingleEmbeddingResponseSchema = lazySchema(() => zodSchema(object({ embedding: object({ values: array(number()) }) })));
function getModelPath(modelId) {
	return modelId.includes("/") ? modelId : `models/${modelId}`;
}
function convertGoogleUsage(usage) {
	var _a, _b, _c, _d;
	if (usage == null) return createNullLanguageModelUsage();
	const promptTokens = (_a = usage.promptTokenCount) != null ? _a : 0;
	const candidatesTokens = (_b = usage.candidatesTokenCount) != null ? _b : 0;
	const cachedContentTokens = (_c = usage.cachedContentTokenCount) != null ? _c : 0;
	const thoughtsTokens = (_d = usage.thoughtsTokenCount) != null ? _d : 0;
	return {
		inputTokens: {
			total: promptTokens,
			noCache: promptTokens - cachedContentTokens,
			cacheRead: cachedContentTokens,
			cacheWrite: void 0
		},
		outputTokens: {
			total: candidatesTokens + thoughtsTokens,
			text: candidatesTokens,
			reasoning: thoughtsTokens
		},
		raw: usage
	};
}
var recursiveReferenceFunctionalityPrefix = "recursive JSON Schema reference:";
function isRecursiveJSONSchemaReferenceError(error) {
	return UnsupportedFunctionalityError.isInstance(error) && error.functionality.startsWith(recursiveReferenceFunctionalityPrefix);
}
function convertJSONSchemaToOpenAPISchema(jsonSchema, isRoot = true) {
	const rootSchema = typeof jsonSchema === "object" ? jsonSchema : void 0;
	return convertJSONSchemaDefinition(jsonSchema, isRoot, {
		definitions: rootSchema == null ? void 0 : rootSchema.definitions,
		dollarDefinitions: rootSchema == null ? void 0 : rootSchema.$defs,
		resolvingReferences: /* @__PURE__ */ new Set()
	});
}
function convertJSONSchemaDefinition(jsonSchema, isRoot, referenceContext) {
	if (jsonSchema == null) return;
	if (typeof jsonSchema === "boolean") return {
		type: "boolean",
		properties: {}
	};
	if (jsonSchema.$ref != null) return convertJSONSchemaReference({
		jsonSchema,
		reference: jsonSchema.$ref,
		isRoot,
		referenceContext
	});
	if (isEmptyObjectSchema(jsonSchema)) {
		if (isRoot) return;
		if (jsonSchema.description) return {
			type: "object",
			description: jsonSchema.description
		};
		return { type: "object" };
	}
	const { type, description, required, properties, items, allOf, anyOf, oneOf, format, const: constValue, minLength, enum: enumValues } = jsonSchema;
	const result = {};
	if (description) result.description = description;
	if (required) result.required = required;
	if (format) result.format = format;
	if (type) if (Array.isArray(type)) {
		const hasNull = type.includes("null");
		const nonNullTypes = type.filter((t) => t !== "null");
		if (nonNullTypes.length === 0) result.type = "null";
		else {
			result.anyOf = nonNullTypes.map((t) => ({ type: t }));
			if (hasNull) result.nullable = true;
		}
	} else result.type = type;
	const values = enumValues != null ? enumValues : constValue !== void 0 ? [constValue] : void 0;
	if (values !== void 0) addEnumToSchema({
		values,
		type,
		result
	});
	if (properties != null) result.properties = Object.entries(properties).reduce((acc, [key, value]) => {
		acc[key] = convertJSONSchemaDefinition(value, false, referenceContext);
		return acc;
	}, {});
	if (items) result.items = Array.isArray(items) ? items.map((item) => convertJSONSchemaDefinition(item, false, referenceContext)) : convertJSONSchemaDefinition(items, false, referenceContext);
	if (allOf) result.allOf = allOf.map((item) => convertJSONSchemaDefinition(item, false, referenceContext));
	if (anyOf) if (anyOf.some((schema) => typeof schema === "object" && (schema == null ? void 0 : schema.type) === "null")) {
		const nonNullSchemas = anyOf.filter((schema) => !(typeof schema === "object" && (schema == null ? void 0 : schema.type) === "null"));
		if (nonNullSchemas.length === 1) {
			const converted = convertJSONSchemaDefinition(nonNullSchemas[0], false, referenceContext);
			if (typeof converted === "object") {
				result.nullable = true;
				Object.assign(result, converted);
			}
		} else {
			result.anyOf = nonNullSchemas.map((item) => convertJSONSchemaDefinition(item, false, referenceContext));
			result.nullable = true;
		}
	} else result.anyOf = anyOf.map((item) => convertJSONSchemaDefinition(item, false, referenceContext));
	if (oneOf) result.oneOf = oneOf.map((item) => convertJSONSchemaDefinition(item, false, referenceContext));
	if (minLength !== void 0) result.minLength = minLength;
	return result;
}
function convertJSONSchemaReference({ jsonSchema, reference, isRoot, referenceContext }) {
	const { definition, referenceKey } = getReferencedDefinition(reference, referenceContext);
	if (referenceContext.resolvingReferences.has(referenceKey)) throw new UnsupportedFunctionalityError({
		functionality: `${recursiveReferenceFunctionalityPrefix} ${reference}`,
		message: "Google schema conversion does not support recursive JSON Schema references."
	});
	const resolvingReferences = new Set(referenceContext.resolvingReferences);
	resolvingReferences.add(referenceKey);
	const { $ref: _reference, ...siblingSchema } = jsonSchema;
	return convertJSONSchemaDefinition(typeof definition === "boolean" ? definition ? siblingSchema : false : {
		...definition,
		...siblingSchema
	}, isRoot, {
		...referenceContext,
		resolvingReferences
	});
}
function getReferencedDefinition(reference, referenceContext) {
	const source = [{
		prefix: "#/$defs/",
		definitions: referenceContext.dollarDefinitions
	}, {
		prefix: "#/definitions/",
		definitions: referenceContext.definitions
	}].find(({ prefix }) => reference.startsWith(prefix));
	const encodedDefinitionName = source ? reference.slice(source.prefix.length) : void 0;
	if (source == null || encodedDefinitionName == null || encodedDefinitionName.length === 0 || encodedDefinitionName.includes("/")) throwUnsupportedReference(reference);
	let decodedDefinitionName;
	try {
		decodedDefinitionName = decodeURIComponent(encodedDefinitionName);
	} catch (e) {
		throwUnsupportedReference(reference);
	}
	if (decodedDefinitionName.includes("/") || /~(?![01])/u.test(decodedDefinitionName) || source.definitions == null) throwUnsupportedReference(reference);
	const definitionName = decodedDefinitionName.replace(/~[01]/g, (match) => match === "~1" ? "/" : "~");
	if (!Object.prototype.hasOwnProperty.call(source.definitions, definitionName)) throwUnsupportedReference(reference);
	return {
		definition: source.definitions[definitionName],
		referenceKey: `${source.prefix}${definitionName}`
	};
}
function throwUnsupportedReference(reference) {
	throw new UnsupportedFunctionalityError({
		functionality: `JSON Schema reference: ${reference}`,
		message: "Google schema conversion only supports references to direct children of root-level $defs or definitions."
	});
}
function addEnumToSchema({ values, type, result }) {
	const nullable = Array.isArray(type) && type.includes("null") || type === void 0 && values.includes(null);
	const enumValues = nullable ? values.filter((value) => value !== null) : values;
	if (values.length > 0 && values.every((value) => value === null)) {
		if (type === void 0 || type === "null" || Array.isArray(type) && type.includes("null")) {
			result.type = "null";
			if (Array.isArray(type)) delete result.anyOf;
			return;
		}
	}
	const enumType = getEnumType({
		values: enumValues,
		type
	});
	if (enumType === void 0) throw new UnsupportedFunctionalityError({
		functionality: "JSON Schema enum with mixed or unsupported values",
		message: "Google does not support this JSON Schema enum. Enum values must share one supported primitive type and match the schema type."
	});
	result.type = enumType;
	if (Array.isArray(type)) delete result.anyOf;
	if (nullable) result.nullable = true;
	if (enumType === "string") result.enum = enumValues;
	else {
		result.format = "enum";
		result.enum = enumValues.map(String);
	}
}
function getEnumType({ values, type }) {
	if (values.length === 0) return;
	const typeAllows = (enumType) => type === void 0 || type === enumType || Array.isArray(type) && type.includes(enumType);
	if (typeAllows("string") && values.every((value) => typeof value === "string")) return "string";
	if ((typeAllows("number") || typeAllows("integer")) && values.every((value) => typeof value === "number" && Number.isFinite(value))) {
		if (typeAllows("number")) return "number";
		if (values.every((value) => Number.isInteger(value))) return "integer";
	}
	if (typeAllows("boolean") && values.every((value) => typeof value === "boolean")) return "boolean";
}
function isEmptyObjectSchema(jsonSchema) {
	return jsonSchema != null && typeof jsonSchema === "object" && jsonSchema.type === "object" && (jsonSchema.properties == null || Object.keys(jsonSchema.properties).length === 0) && !jsonSchema.additionalProperties;
}
var SKIP_THOUGHT_SIGNATURE_VALIDATOR = "skip_thought_signature_validator";
var dataUrlRegex = /^data:([^;,]+);base64,(.+)$/s;
function parseBase64DataUrl(value) {
	const match = dataUrlRegex.exec(value);
	if (match == null) return;
	return {
		mediaType: match[1],
		data: match[2]
	};
}
function convertUrlToolResultPart(url) {
	const parsedDataUrl = parseBase64DataUrl(url);
	if (parsedDataUrl == null) return;
	return { inlineData: {
		mimeType: parsedDataUrl.mediaType,
		data: parsedDataUrl.data
	} };
}
function appendToolResultParts(parts, toolName, outputValue, toolCallId, includeFunctionCallIds = true) {
	const functionResponseParts = [];
	const responseTextParts = [];
	for (const contentPart of outputValue) switch (contentPart.type) {
		case "text":
			responseTextParts.push(contentPart.text);
			break;
		case "file":
			if (contentPart.data.type === "data") functionResponseParts.push({ inlineData: {
				mimeType: resolveFullMediaType({ part: contentPart }),
				data: convertToBase64(contentPart.data.data)
			} });
			else if (contentPart.data.type === "url") {
				const functionResponsePart = convertUrlToolResultPart(contentPart.data.url.toString());
				if (functionResponsePart != null) functionResponseParts.push(functionResponsePart);
				else responseTextParts.push(JSON.stringify(contentPart));
			} else responseTextParts.push(JSON.stringify(contentPart));
			break;
		default: responseTextParts.push(JSON.stringify(contentPart));
	}
	parts.push({ functionResponse: {
		...includeFunctionCallIds && toolCallId != null ? { id: toolCallId } : {},
		name: toolName,
		response: {
			name: toolName,
			content: responseTextParts.length > 0 ? responseTextParts.join("\n") : "Tool executed successfully."
		},
		...functionResponseParts.length > 0 ? { parts: functionResponseParts } : {}
	} });
}
function appendLegacyToolResultParts(parts, toolName, outputValue, toolCallId, includeFunctionCallIds = true) {
	for (const contentPart of outputValue) switch (contentPart.type) {
		case "text":
			parts.push({ functionResponse: {
				...includeFunctionCallIds && toolCallId != null ? { id: toolCallId } : {},
				name: toolName,
				response: {
					name: toolName,
					content: contentPart.text
				}
			} });
			break;
		case "file":
			if (contentPart.data.type === "data") {
				const topLevelMediaType = getTopLevelMediaType(contentPart.mediaType);
				parts.push({ inlineData: {
					mimeType: resolveFullMediaType({ part: contentPart }),
					data: convertToBase64(contentPart.data.data)
				} }, { text: `Tool executed successfully and returned this ${topLevelMediaType === "image" ? "image" : "file"} as a response` });
			} else parts.push({ text: JSON.stringify(contentPart) });
			break;
		default: parts.push({ text: JSON.stringify(contentPart) });
	}
}
function convertToGoogleMessages(prompt, options) {
	var _a, _b, _c, _d, _e, _f;
	const systemInstructionParts = [];
	const contents = [];
	let systemMessagesAllowed = true;
	const isGemmaModel = (_a = options == null ? void 0 : options.isGemmaModel) != null ? _a : false;
	const isGemini3Model = (_b = options == null ? void 0 : options.isGemini3Model) != null ? _b : false;
	const onWarning = options == null ? void 0 : options.onWarning;
	const providerOptionsNames = (_c = options == null ? void 0 : options.providerOptionsNames) != null ? _c : ["google"];
	const isVertexLike = !providerOptionsNames.includes("google");
	const supportsFunctionResponseParts = (_d = options == null ? void 0 : options.supportsFunctionResponseParts) != null ? _d : true;
	const includeFunctionCallIds = (_e = options == null ? void 0 : options.includeFunctionCallIds) != null ? _e : true;
	let sentinelInjected = false;
	const missingSignatureToolNames = [];
	const injectSkipSignature = (toolName) => {
		missingSignatureToolNames.push(toolName);
		sentinelInjected = true;
		return SKIP_THOUGHT_SIGNATURE_VALIDATOR;
	};
	const readProviderOpts = (part) => {
		var _a2, _b2, _c2, _d2, _e2;
		for (const name of providerOptionsNames) {
			const v = (_a2 = part.providerOptions) == null ? void 0 : _a2[name];
			if (v != null) return v;
		}
		if (isVertexLike) return (_b2 = part.providerOptions) == null ? void 0 : _b2.google;
		return (_e2 = (_c2 = part.providerOptions) == null ? void 0 : _c2.googleVertex) != null ? _e2 : (_d2 = part.providerOptions) == null ? void 0 : _d2.vertex;
	};
	for (const { role, content } of prompt) switch (role) {
		case "system":
			if (!systemMessagesAllowed) throw new UnsupportedFunctionalityError({ functionality: "system messages are only supported at the beginning of the conversation" });
			systemInstructionParts.push({ text: content });
			break;
		case "user": {
			systemMessagesAllowed = false;
			const parts = [];
			for (const part of content) switch (part.type) {
				case "text":
					parts.push({ text: part.text });
					break;
				case "file": switch (part.data.type) {
					case "url":
						parts.push({ fileData: {
							mimeType: resolveFullMediaType({ part }),
							fileUri: part.data.url.toString()
						} });
						break;
					case "reference":
						if (isVertexLike) throw new UnsupportedFunctionalityError({ functionality: "file parts with provider references" });
						parts.push({ fileData: {
							mimeType: resolveFullMediaType({ part }),
							fileUri: resolveProviderReference({
								reference: part.data.reference,
								provider: "google"
							})
						} });
						break;
					case "text":
						parts.push({ inlineData: {
							mimeType: isFullMediaType(part.mediaType) ? part.mediaType : "text/plain",
							data: convertToBase64(new TextEncoder().encode(part.data.text))
						} });
						break;
					case "data": parts.push({ inlineData: {
						mimeType: resolveFullMediaType({ part }),
						data: convertToBase64(part.data.data)
					} });
				}
			}
			contents.push({
				role: "user",
				parts
			});
			break;
		}
		case "assistant": {
			systemMessagesAllowed = false;
			let modelResponseHasSignedFunctionCall = false;
			contents.push({
				role: "model",
				parts: content.map((part) => {
					const providerOpts = readProviderOpts(part);
					const thoughtSignature = (providerOpts == null ? void 0 : providerOpts.thoughtSignature) != null ? String(providerOpts.thoughtSignature) : void 0;
					switch (part.type) {
						case "text": return part.text.length === 0 ? void 0 : {
							text: part.text,
							thoughtSignature
						};
						case "reasoning": return part.text.length === 0 ? void 0 : {
							text: part.text,
							thought: true,
							thoughtSignature
						};
						case "reasoning-file":
							switch (part.data.type) {
								case "url": throw new UnsupportedFunctionalityError({ functionality: "File data URLs in assistant messages are not supported" });
								case "data": return {
									inlineData: {
										mimeType: part.mediaType,
										data: convertToBase64(part.data.data)
									},
									thought: true,
									thoughtSignature
								};
							}
							break;
						case "file":
							switch (part.data.type) {
								case "url": throw new UnsupportedFunctionalityError({ functionality: "File data URLs in assistant messages are not supported" });
								case "reference":
									if (isVertexLike) throw new UnsupportedFunctionalityError({ functionality: "file parts with provider references" });
									return {
										fileData: {
											mimeType: part.mediaType,
											fileUri: resolveProviderReference({
												reference: part.data.reference,
												provider: "google"
											})
										},
										...(providerOpts == null ? void 0 : providerOpts.thought) === true ? { thought: true } : {},
										thoughtSignature
									};
								case "text": return {
									inlineData: {
										mimeType: isFullMediaType(part.mediaType) ? part.mediaType : "text/plain",
										data: convertToBase64(new TextEncoder().encode(part.data.text))
									},
									...(providerOpts == null ? void 0 : providerOpts.thought) === true ? { thought: true } : {},
									thoughtSignature
								};
								case "data": return {
									inlineData: {
										mimeType: part.mediaType,
										data: convertToBase64(part.data.data)
									},
									...(providerOpts == null ? void 0 : providerOpts.thought) === true ? { thought: true } : {},
									thoughtSignature
								};
							}
							break;
						case "tool-call": {
							const serverToolCallId = (providerOpts == null ? void 0 : providerOpts.serverToolCallId) != null ? String(providerOpts.serverToolCallId) : void 0;
							const serverToolType = (providerOpts == null ? void 0 : providerOpts.serverToolType) != null ? String(providerOpts.serverToolType) : void 0;
							const isServerToolCall = serverToolCallId != null && serverToolType != null;
							const effectiveThoughtSignature = thoughtSignature != null ? thoughtSignature : isGemini3Model && !(!isServerToolCall && thoughtSignature == null && modelResponseHasSignedFunctionCall) ? injectSkipSignature(part.toolName) : void 0;
							if (!isServerToolCall && thoughtSignature != null) modelResponseHasSignedFunctionCall = true;
							if (isServerToolCall) return {
								toolCall: {
									toolType: serverToolType,
									args: typeof part.input === "string" ? secureJsonParse(part.input) : part.input,
									id: serverToolCallId
								},
								thoughtSignature: effectiveThoughtSignature
							};
							return {
								functionCall: {
									...includeFunctionCallIds && part.toolCallId != null ? { id: part.toolCallId } : {},
									name: part.toolName,
									args: part.input
								},
								thoughtSignature: effectiveThoughtSignature
							};
						}
						case "tool-result": {
							const serverToolCallId = (providerOpts == null ? void 0 : providerOpts.serverToolCallId) != null ? String(providerOpts.serverToolCallId) : void 0;
							const serverToolType = (providerOpts == null ? void 0 : providerOpts.serverToolType) != null ? String(providerOpts.serverToolType) : void 0;
							if (serverToolCallId && serverToolType) return {
								toolResponse: {
									toolType: serverToolType,
									response: part.output.type === "json" ? part.output.value : {},
									id: serverToolCallId
								},
								thoughtSignature
							};
							return;
						}
					}
				}).filter((part) => part !== void 0)
			});
			break;
		}
		case "tool": {
			systemMessagesAllowed = false;
			const parts = [];
			for (const part of content) {
				if (part.type === "tool-approval-response") continue;
				const partProviderOpts = readProviderOpts(part);
				const serverToolCallId = (partProviderOpts == null ? void 0 : partProviderOpts.serverToolCallId) != null ? String(partProviderOpts.serverToolCallId) : void 0;
				const serverToolType = (partProviderOpts == null ? void 0 : partProviderOpts.serverToolType) != null ? String(partProviderOpts.serverToolType) : void 0;
				if (serverToolCallId && serverToolType) {
					const serverThoughtSignature = (partProviderOpts == null ? void 0 : partProviderOpts.thoughtSignature) != null ? String(partProviderOpts.thoughtSignature) : void 0;
					if (contents.length > 0) {
						const lastContent = contents[contents.length - 1];
						if (lastContent.role === "model") {
							lastContent.parts.push({
								toolResponse: {
									toolType: serverToolType,
									response: part.output.type === "json" ? part.output.value : {},
									id: serverToolCallId
								},
								thoughtSignature: serverThoughtSignature
							});
							continue;
						}
					}
				}
				const output = part.output;
				if (output.type === "content") if (supportsFunctionResponseParts) appendToolResultParts(parts, part.toolName, output.value, part.toolCallId, includeFunctionCallIds);
				else appendLegacyToolResultParts(parts, part.toolName, output.value, part.toolCallId, includeFunctionCallIds);
				else parts.push({ functionResponse: {
					...includeFunctionCallIds && part.toolCallId != null ? { id: part.toolCallId } : {},
					name: part.toolName,
					response: {
						name: part.toolName,
						content: output.type === "execution-denied" ? (_f = output.reason) != null ? _f : "Tool call execution denied." : output.value
					}
				} });
			}
			contents.push({
				role: "user",
				parts
			});
			break;
		}
	}
	if (isGemmaModel && systemInstructionParts.length > 0 && contents.length > 0 && contents[0].role === "user") {
		const systemText = systemInstructionParts.map((part) => part.text).join("\n\n");
		contents[0].parts.unshift({ text: systemText + "\n\n" });
	}
	if (sentinelInjected && onWarning != null) {
		const uniqueToolNames = Array.from(new Set(missingSignatureToolNames));
		onWarning({
			type: "other",
			message: `Replayed ${missingSignatureToolNames.length} \`functionCall\` part(s) for a Gemini 3 model without a \`thoughtSignature\` (tools: ${uniqueToolNames.map((name) => `\`${name}\``).join(", ")}). Injected the documented \`skip_thought_signature_validator\` sentinel to keep the request from failing with HTTP 400. The likely cause is application code that drops \`providerOptions.google.thoughtSignature\` when persisting or serializing assistant tool-call messages. See https://ai.google.dev/gemini-api/docs/thought-signatures.`
		});
	}
	return {
		systemInstruction: systemInstructionParts.length > 0 && !isGemmaModel ? { parts: systemInstructionParts } : void 0,
		contents
	};
}
var googleLanguageModelOptions = lazySchema(() => zodSchema(object({
	responseModalities: array(_enum(["TEXT", "IMAGE"])).optional(),
	thinkingConfig: object({
		thinkingBudget: number().optional(),
		includeThoughts: boolean().optional(),
		thinkingLevel: _enum([
			"minimal",
			"low",
			"medium",
			"high"
		]).optional()
	}).optional(),
	/**
	* Optional.
	* The name of the cached content used as context to serve the prediction.
	* Format: cachedContents/{cachedContent}
	*/
	cachedContent: string().optional(),
	/**
	* Optional. Enable structured output. Default is true.
	*
	* This is useful when the JSON Schema contains elements that are
	* not supported by the OpenAPI schema version that
	* Google uses. You can use this to disable
	* structured outputs if you need to.
	*/
	structuredOutputs: boolean().optional(),
	/**
	* Optional. A list of unique safety settings for blocking unsafe content.
	*/
	safetySettings: array(object({
		category: _enum([
			"HARM_CATEGORY_UNSPECIFIED",
			"HARM_CATEGORY_HATE_SPEECH",
			"HARM_CATEGORY_DANGEROUS_CONTENT",
			"HARM_CATEGORY_HARASSMENT",
			"HARM_CATEGORY_SEXUALLY_EXPLICIT",
			"HARM_CATEGORY_CIVIC_INTEGRITY"
		]),
		threshold: _enum([
			"HARM_BLOCK_THRESHOLD_UNSPECIFIED",
			"BLOCK_LOW_AND_ABOVE",
			"BLOCK_MEDIUM_AND_ABOVE",
			"BLOCK_ONLY_HIGH",
			"BLOCK_NONE",
			"OFF"
		])
	})).optional(),
	threshold: _enum([
		"HARM_BLOCK_THRESHOLD_UNSPECIFIED",
		"BLOCK_LOW_AND_ABOVE",
		"BLOCK_MEDIUM_AND_ABOVE",
		"BLOCK_ONLY_HIGH",
		"BLOCK_NONE",
		"OFF"
	]).optional(),
	/**
	* Optional. Enables timestamp understanding for audio-only files.
	*
	* https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/audio-understanding
	*/
	audioTimestamp: boolean().optional(),
	/**
	* Optional. Defines labels used in billing reports. Available on Vertex AI only.
	*
	* https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/add-labels-to-api-calls
	*/
	labels: record(string(), string()).optional(),
	/**
	* Optional. If specified, the media resolution specified will be used.
	*
	* https://ai.google.dev/api/generate-content#MediaResolution
	*/
	mediaResolution: _enum([
		"MEDIA_RESOLUTION_UNSPECIFIED",
		"MEDIA_RESOLUTION_LOW",
		"MEDIA_RESOLUTION_MEDIUM",
		"MEDIA_RESOLUTION_HIGH"
	]).optional(),
	/**
	* Optional. Configures the image generation aspect ratio for Gemini models.
	*
	* https://ai.google.dev/gemini-api/docs/image-generation#aspect_ratios
	*/
	imageConfig: object({
		aspectRatio: _enum([
			"1:1",
			"2:3",
			"3:2",
			"3:4",
			"4:3",
			"4:5",
			"5:4",
			"9:16",
			"16:9",
			"21:9",
			"1:8",
			"8:1",
			"1:4",
			"4:1"
		]).optional(),
		imageSize: _enum([
			"1K",
			"2K",
			"4K",
			"512"
		]).optional(),
		/**
		* Optional. Controls the generation of people in images.
		* Vertex AI only.
		*/
		personGeneration: _enum([
			"PERSON_GENERATION_UNSPECIFIED",
			"ALLOW_ALL",
			"ALLOW_ADULT",
			"ALLOW_NONE"
		]).optional(),
		/**
		* Optional. Controls whether generation of prominent people
		* (celebrities) is allowed. When set together with
		* `personGeneration`, `personGeneration` takes precedence.
		* Vertex AI only.
		*
		* https://docs.cloud.google.com/vertex-ai/generative-ai/docs/reference/rest/v1/GenerationConfig
		*/
		prominentPeople: _enum([
			"PROMINENT_PEOPLE_UNSPECIFIED",
			"ALLOW_PROMINENT_PEOPLE",
			"BLOCK_PROMINENT_PEOPLE"
		]).optional(),
		/**
		* Optional. The image output format for generated images.
		* Vertex AI only.
		*/
		imageOutputOptions: object({
			mimeType: _enum(["image/jpeg", "image/png"]).optional(),
			compressionQuality: number().optional()
		}).optional()
	}).optional(),
	/**
	* Optional. Configuration for grounding retrieval.
	* Used to provide location context for Google Maps and Google Search grounding.
	*
	* https://cloud.google.com/vertex-ai/generative-ai/docs/grounding/grounding-with-google-maps
	*/
	retrievalConfig: object({ latLng: object({
		latitude: number(),
		longitude: number()
	}).optional() }).optional(),
	/**
	* Optional. When set to true, function call arguments will be streamed
	* incrementally via partialArgs in streaming responses. Only supported
	* on the Vertex AI API (not the Gemini API) and only for Gemini 3+
	* models.
	*
	* @default false
	*
	* https://docs.cloud.google.com/vertex-ai/generative-ai/docs/multimodal/function-calling#streaming-fc
	*/
	streamFunctionCallArguments: boolean().optional(),
	/**
	* Optional. The service tier to use for the request. Sent as the
	* `serviceTier` body field. Gemini API only.
	*/
	serviceTier: _enum([
		"standard",
		"flex",
		"priority"
	]).optional(),
	/**
	* Optional. Vertex AI only. Sent as the
	* `X-Vertex-AI-LLM-Shared-Request-Type` request header to select a
	* shared (PayGo) tier. With Provisioned Throughput allocated and
	* `requestType` unset, the request falls back to this tier only if
	* PT capacity is exhausted.
	*
	* https://docs.cloud.google.com/vertex-ai/generative-ai/docs/priority-paygo
	* https://docs.cloud.google.com/vertex-ai/generative-ai/docs/flex-paygo
	*/
	sharedRequestType: _enum([
		"priority",
		"flex",
		"standard"
	]).optional(),
	/**
	* Optional. Vertex AI only. Sent as the `X-Vertex-AI-LLM-Request-Type`
	* request header. Set to `'shared'` together with `sharedRequestType`
	* to bypass Provisioned Throughput entirely.
	*
	* https://docs.cloud.google.com/vertex-ai/generative-ai/docs/priority-paygo
	*/
	requestType: _enum(["shared"]).optional()
})));
var gemini1ModelPattern = /(^|\/)gemini-1(?:[.-]|$)/i;
var gemini2ModelPattern = /(^|\/)gemini-2(?:[.-]|$)/i;
var gemini25ModelPattern = /(^|\/)gemini-2\.5(?:[.-]|$)/i;
var geminiModelPattern = /(^|\/)gemini-/i;
function isKnownPreGemini2Model(modelId) {
	return gemini1ModelPattern.test(modelId) || /(^|\/)gemini-pro(?:-vision)?$/i.test(modelId) || /(^|\/)gemini-robotics-er-1\.5(?:[.-]|$)/i.test(modelId);
}
function getGoogleModelCapabilities(modelId) {
	const isGeminiModel = geminiModelPattern.test(modelId);
	const isGemini2Model = gemini2ModelPattern.test(modelId);
	const isKnownPreGemini2 = isKnownPreGemini2Model(modelId);
	const usesGemini3Features = isGeminiModel && !(isKnownPreGemini2 || isGemini2Model);
	return {
		supportsGemini2Tools: isGeminiModel && !isKnownPreGemini2 || modelId.toLowerCase().includes("nano-banana"),
		supportsFileSearch: gemini25ModelPattern.test(modelId) || usesGemini3Features,
		usesGemini3Features
	};
}
function prepareTools({ tools, toolChoice, modelId, isVertexProvider = false }) {
	tools = (tools == null ? void 0 : tools.length) ? tools : void 0;
	const toolWarnings = [];
	const { supportsGemini2Tools, supportsFileSearch, usesGemini3Features } = getGoogleModelCapabilities(modelId);
	if (tools == null) return {
		tools: void 0,
		toolConfig: void 0,
		toolWarnings
	};
	const hasFunctionTools = tools.some((tool) => tool.type === "function");
	const hasProviderTools = tools.some((tool) => tool.type === "provider");
	if (hasFunctionTools && hasProviderTools && !usesGemini3Features) toolWarnings.push({
		type: "unsupported",
		feature: `combination of function and provider-defined tools`
	});
	if (hasProviderTools) {
		const googleTools2 = [];
		tools.filter((tool) => tool.type === "provider").forEach((tool) => {
			switch (tool.id) {
				case "google.google_search":
					if (supportsGemini2Tools) googleTools2.push({ googleSearch: { ...tool.args } });
					else toolWarnings.push({
						type: "unsupported",
						feature: `provider-defined tool ${tool.id}`,
						details: "Google Search requires Gemini 2.0 or newer."
					});
					break;
				case "google.enterprise_web_search":
					if (supportsGemini2Tools) googleTools2.push({ enterpriseWebSearch: {} });
					else toolWarnings.push({
						type: "unsupported",
						feature: `provider-defined tool ${tool.id}`,
						details: "Enterprise Web Search requires Gemini 2.0 or newer."
					});
					break;
				case "google.url_context":
					if (supportsGemini2Tools) googleTools2.push({ urlContext: {} });
					else toolWarnings.push({
						type: "unsupported",
						feature: `provider-defined tool ${tool.id}`,
						details: "The URL context tool is not supported with other Gemini models than Gemini 2."
					});
					break;
				case "google.code_execution":
					if (supportsGemini2Tools) googleTools2.push({ codeExecution: {} });
					else toolWarnings.push({
						type: "unsupported",
						feature: `provider-defined tool ${tool.id}`,
						details: "The code execution tool is not supported with other Gemini models than Gemini 2."
					});
					break;
				case "google.file_search":
					if (supportsFileSearch) googleTools2.push({ fileSearch: { ...tool.args } });
					else toolWarnings.push({
						type: "unsupported",
						feature: `provider-defined tool ${tool.id}`,
						details: "The file search tool is only supported with Gemini 2.5 models and Gemini 3 models."
					});
					break;
				case "google.vertex_rag_store":
					if (supportsGemini2Tools) googleTools2.push({ retrieval: { vertex_rag_store: {
						rag_resources: { rag_corpus: tool.args.ragCorpus },
						similarity_top_k: tool.args.topK
					} } });
					else toolWarnings.push({
						type: "unsupported",
						feature: `provider-defined tool ${tool.id}`,
						details: "The RAG store tool is not supported with other Gemini models than Gemini 2."
					});
					break;
				case "google.google_maps":
					if (supportsGemini2Tools) googleTools2.push({ googleMaps: {} });
					else toolWarnings.push({
						type: "unsupported",
						feature: `provider-defined tool ${tool.id}`,
						details: "The Google Maps grounding tool is not supported with Gemini models other than Gemini 2 or newer."
					});
					break;
				default: toolWarnings.push({
					type: "unsupported",
					feature: `provider-defined tool ${tool.id}`
				});
			}
		});
		if (hasFunctionTools && usesGemini3Features && googleTools2.length > 0) {
			const functionDeclarations2 = [];
			for (const tool of tools) if (tool.type === "function") functionDeclarations2.push(prepareFunctionDeclaration(tool));
			const combinedToolConfig = {
				functionCallingConfig: { mode: "VALIDATED" },
				...!isVertexProvider && { includeServerSideToolInvocations: true }
			};
			if (toolChoice != null) switch (toolChoice.type) {
				case "auto": break;
				case "none":
					combinedToolConfig.functionCallingConfig = { mode: "NONE" };
					break;
				case "required":
					combinedToolConfig.functionCallingConfig = { mode: "ANY" };
					break;
				case "tool": combinedToolConfig.functionCallingConfig = {
					mode: "ANY",
					allowedFunctionNames: [toolChoice.toolName]
				};
			}
			return {
				tools: [...googleTools2, { functionDeclarations: functionDeclarations2 }],
				toolConfig: combinedToolConfig,
				toolWarnings
			};
		}
		return {
			tools: googleTools2.length > 0 ? googleTools2 : void 0,
			toolConfig: void 0,
			toolWarnings
		};
	}
	const functionDeclarations = [];
	let hasStrictTools = false;
	for (const tool of tools) switch (tool.type) {
		case "function":
			functionDeclarations.push(prepareFunctionDeclaration(tool));
			if (tool.strict === true) hasStrictTools = true;
			break;
		default: toolWarnings.push({
			type: "unsupported",
			feature: `function tool ${tool.name}`
		});
	}
	if (toolChoice == null) return {
		tools: [{ functionDeclarations }],
		toolConfig: hasStrictTools ? { functionCallingConfig: { mode: "VALIDATED" } } : void 0,
		toolWarnings
	};
	const type = toolChoice.type;
	switch (type) {
		case "auto": return {
			tools: [{ functionDeclarations }],
			toolConfig: { functionCallingConfig: { mode: hasStrictTools ? "VALIDATED" : "AUTO" } },
			toolWarnings
		};
		case "none": return {
			tools: [{ functionDeclarations }],
			toolConfig: { functionCallingConfig: { mode: "NONE" } },
			toolWarnings
		};
		case "required": return {
			tools: [{ functionDeclarations }],
			toolConfig: { functionCallingConfig: { mode: "ANY" } },
			toolWarnings
		};
		case "tool": return {
			tools: [{ functionDeclarations }],
			toolConfig: { functionCallingConfig: {
				mode: "ANY",
				allowedFunctionNames: [toolChoice.toolName]
			} },
			toolWarnings
		};
		default: throw new UnsupportedFunctionalityError({ functionality: `tool choice type: ${type}` });
	}
}
function prepareFunctionDeclaration(tool) {
	var _a;
	const declaration = {
		name: tool.name,
		description: (_a = tool.description) != null ? _a : ""
	};
	try {
		return {
			...declaration,
			parameters: convertJSONSchemaToOpenAPISchema(tool.inputSchema)
		};
	} catch (error) {
		if (!isRecursiveJSONSchemaReferenceError(error)) throw error;
		return {
			...declaration,
			parametersJsonSchema: tool.inputSchema
		};
	}
}
var GoogleJSONAccumulator = class {
	constructor() {
		this.accumulatedArgs = {};
		this.jsonText = "";
		/**
		* Stack representing the currently "open" containers in the JSON output.
		* Entry 0 is always the root `{` object once the first value is written.
		*/
		this.pathStack = [];
		/**
		* Whether a string value is currently "open" (willContinue was true),
		* meaning the closing quote has not yet been emitted.
		*/
		this.stringOpen = false;
	}
	/**
	* Input: [{jsonPath:"$.brightness",numberValue:50}]
	* Output: { currentJSON:{brightness:50}, textDelta:'{"brightness":50' }
	*/
	processPartialArgs(partialArgs) {
		let delta = "";
		for (const arg of partialArgs) {
			const rawPath = arg.jsonPath.replace(/^\$\./, "");
			if (!rawPath) continue;
			const segments = parsePath(rawPath);
			const existingValue = getNestedValue(this.accumulatedArgs, segments);
			if (arg.stringValue != null && existingValue !== void 0) {
				const escaped = JSON.stringify(arg.stringValue).slice(1, -1);
				setNestedValue(this.accumulatedArgs, segments, existingValue + arg.stringValue);
				delta += escaped;
				continue;
			}
			const resolved = resolvePartialArgValue(arg);
			if (resolved == null) continue;
			setNestedValue(this.accumulatedArgs, segments, resolved.value);
			delta += this.emitNavigationTo(segments, arg, resolved.json);
		}
		this.jsonText += delta;
		return {
			currentJSON: this.accumulatedArgs,
			textDelta: delta
		};
	}
	/**
	* Input: jsonText='{"brightness":50', accumulatedArgs={brightness:50}
	* Output: { finalJSON:'{"brightness":50}', closingDelta:'}' }
	*/
	finalize() {
		const finalArgs = JSON.stringify(this.accumulatedArgs);
		return {
			finalJSON: finalArgs,
			closingDelta: finalArgs.slice(this.jsonText.length)
		};
	}
	/**
	* Input: pathStack=[] (first call) or pathStack=[root,...] (subsequent calls)
	* Output: '{' (first call) or '' (subsequent calls)
	*/
	ensureRoot() {
		if (this.pathStack.length === 0) {
			this.pathStack.push({
				segment: "",
				isArray: false,
				childCount: 0
			});
			return "{";
		}
		return "";
	}
	/**
	* Emits the JSON text fragment needed to navigate from the current open
	* path to the new leaf at `targetSegments`, then writes the value.
	*
	* Input: targetSegments=["recipe","name"], arg={jsonPath:"$.recipe.name",stringValue:"Lasagna"}, valueJson='"Lasagna"'
	* Output: '{"recipe":{"name":"Lasagna"'
	*/
	emitNavigationTo(targetSegments, arg, valueJson) {
		let fragment = "";
		if (this.stringOpen) {
			fragment += "\"";
			this.stringOpen = false;
		}
		fragment += this.ensureRoot();
		const targetContainerSegments = targetSegments.slice(0, -1);
		const leafSegment = targetSegments[targetSegments.length - 1];
		const commonDepth = this.findCommonStackDepth(targetContainerSegments);
		fragment += this.closeDownTo(commonDepth);
		fragment += this.openDownTo(targetContainerSegments, leafSegment);
		fragment += this.emitLeaf(leafSegment, arg, valueJson);
		return fragment;
	}
	/**
	* Returns the stack depth to preserve when navigating to a new target
	* container path. Always >= 1 (the root is never popped).
	*
	* Input: stack=[root,"recipe","ingredients",0], target=["recipe","ingredients",1]
	* Output: 3 (keep root+"recipe"+"ingredients")
	*/
	findCommonStackDepth(targetContainer) {
		const maxDepth = Math.min(this.pathStack.length - 1, targetContainer.length);
		let common = 0;
		for (let i = 0; i < maxDepth; i++) if (this.pathStack[i + 1].segment === targetContainer[i]) common++;
		else break;
		return common + 1;
	}
	/**
	* Closes containers from the current stack depth back down to `targetDepth`.
	*
	* Input: this.pathStack=[root,"recipe","ingredients",0], targetDepth=3
	* Output: '}'
	*/
	closeDownTo(targetDepth) {
		let fragment = "";
		while (this.pathStack.length > targetDepth) {
			const entry = this.pathStack.pop();
			fragment += entry.isArray ? "]" : "}";
		}
		return fragment;
	}
	/**
	* Opens containers from the current stack depth down to the full target
	* container path, emitting opening `{`, `[`, keys, and commas as needed.
	* `leafSegment` is used to determine if the innermost container is an array.
	*
	* Input: this.pathStack=[root], targetContainer=["recipe","ingredients"], leafSegment=0
	* Output: '"recipe":{"ingredients":['
	*/
	openDownTo(targetContainer, leafSegment) {
		let fragment = "";
		const startIdx = this.pathStack.length - 1;
		for (let i = startIdx; i < targetContainer.length; i++) {
			const pathSegment = targetContainer[i];
			const parentEntry = this.pathStack[this.pathStack.length - 1];
			if (parentEntry.childCount > 0) fragment += ",";
			parentEntry.childCount++;
			if (typeof pathSegment === "string") fragment += `${JSON.stringify(pathSegment)}:`;
			const isArray = typeof (i + 1 < targetContainer.length ? targetContainer[i + 1] : leafSegment) === "number";
			fragment += isArray ? "[" : "{";
			this.pathStack.push({
				segment: pathSegment,
				isArray,
				childCount: 0
			});
		}
		return fragment;
	}
	/**
	* Emits the comma, key, and value for a leaf entry in the current container.
	*
	* Input: leafSegment="name", arg={stringValue:"Lasagna"}, valueJson='"Lasagna"'
	* Output: '"name":"Lasagna"' (or ',"name":"Lasagna"' if container.childCount > 0)
	*/
	emitLeaf(leafSegment, arg, valueJson) {
		let fragment = "";
		const container = this.pathStack[this.pathStack.length - 1];
		if (container.childCount > 0) fragment += ",";
		container.childCount++;
		if (typeof leafSegment === "string") fragment += `${JSON.stringify(leafSegment)}:`;
		if (arg.stringValue != null && arg.willContinue) {
			fragment += valueJson.slice(0, -1);
			this.stringOpen = true;
		} else fragment += valueJson;
		return fragment;
	}
};
function parsePath(rawPath) {
	const segments = [];
	for (const part of rawPath.split(".")) {
		const bracketIdx = part.indexOf("[");
		if (bracketIdx === -1) segments.push(part);
		else {
			if (bracketIdx > 0) segments.push(part.slice(0, bracketIdx));
			for (const m of part.matchAll(/\[(\d+)\]/g)) segments.push(parseInt(m[1], 10));
		}
	}
	return segments;
}
var hasOwn = Object.prototype.hasOwnProperty;
function hasOwnProperty(obj, key) {
	return hasOwn.call(obj, key);
}
function defineOwnProperty(obj, key, value) {
	Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
}
function getNestedValue(obj, segments) {
	let current = obj;
	for (const pathSegment of segments) {
		if (current == null || typeof current !== "object") return void 0;
		const currentRecord = current;
		if (!hasOwnProperty(currentRecord, pathSegment)) return void 0;
		current = currentRecord[pathSegment];
	}
	return current;
}
function setNestedValue(obj, segments, value) {
	let current = obj;
	for (let i = 0; i < segments.length - 1; i++) {
		const pathSegment = segments[i];
		const nextSeg = segments[i + 1];
		if (!hasOwnProperty(current, pathSegment) || current[pathSegment] == null) defineOwnProperty(current, pathSegment, typeof nextSeg === "number" ? [] : {});
		current = current[pathSegment];
	}
	defineOwnProperty(current, segments[segments.length - 1], value);
}
function resolvePartialArgValue(arg) {
	var _a, _b;
	const value = (_b = (_a = arg.stringValue) != null ? _a : arg.numberValue) != null ? _b : arg.boolValue;
	if (value != null) return {
		value,
		json: JSON.stringify(value)
	};
	if ("nullValue" in arg) return {
		value: null,
		json: "null"
	};
}
function mapGoogleFinishReason({ finishReason, hasToolCalls }) {
	switch (finishReason) {
		case "STOP": return hasToolCalls ? "tool-calls" : "stop";
		case "MAX_TOKENS": return "length";
		case "IMAGE_SAFETY":
		case "RECITATION":
		case "SAFETY":
		case "BLOCKLIST":
		case "PROHIBITED_CONTENT":
		case "SPII": return "content-filter";
		case "MALFORMED_FUNCTION_CALL": return "error";
		default: return "other";
	}
}
var configurableSafetySettingCategories = [
	"HARM_CATEGORY_HATE_SPEECH",
	"HARM_CATEGORY_DANGEROUS_CONTENT",
	"HARM_CATEGORY_HARASSMENT",
	"HARM_CATEGORY_SEXUALLY_EXPLICIT"
];
var gemini25ModelPattern2 = /(^|\/)gemini-2\.5(?:[.-]|$)/i;
var GoogleLanguageModel = class _GoogleLanguageModel {
	constructor(modelId, config) {
		this.specificationVersion = "v4";
		var _a;
		this.modelId = modelId;
		this.config = config;
		this.generateId = (_a = config.generateId) != null ? _a : generateId;
	}
	static [WORKFLOW_SERIALIZE](model) {
		return serializeModelOptions({
			modelId: model.modelId,
			config: model.config
		});
	}
	static [WORKFLOW_DESERIALIZE](options) {
		return new _GoogleLanguageModel(options.modelId, options.config);
	}
	get provider() {
		return this.config.provider;
	}
	get supportedUrls() {
		var _a, _b, _c;
		return (_c = (_b = (_a = this.config).supportedUrls) == null ? void 0 : _b.call(_a)) != null ? _c : {};
	}
	async getArgs({ prompt, maxOutputTokens, temperature, topP, topK, frequencyPenalty, presencePenalty, stopSequences, responseFormat, seed, tools, toolChoice, reasoning, providerOptions }, { isStreaming = false } = {}) {
		var _a, _b, _c;
		const warnings = [];
		const providerOptionsNames = this.config.provider.includes("vertex") ? ["googleVertex", "vertex"] : ["google"];
		let googleOptions;
		for (const name of providerOptionsNames) {
			googleOptions = await parseProviderOptions({
				provider: name,
				providerOptions,
				schema: googleLanguageModelOptions
			});
			if (googleOptions != null) break;
		}
		if (googleOptions == null && !providerOptionsNames.includes("google")) googleOptions = await parseProviderOptions({
			provider: "google",
			providerOptions,
			schema: googleLanguageModelOptions
		});
		const isVertexProvider = this.config.provider.startsWith("google.vertex.");
		if ((tools == null ? void 0 : tools.some((tool) => tool.type === "provider" && tool.id === "google.vertex_rag_store")) && !isVertexProvider) warnings.push({
			type: "other",
			message: `The 'vertex_rag_store' tool is only supported with the Google Vertex provider and might not be supported or could behave unexpectedly with the current Google provider (${this.config.provider}).`
		});
		if ((googleOptions == null ? void 0 : googleOptions.streamFunctionCallArguments) && !isVertexProvider) warnings.push({
			type: "other",
			message: `'streamFunctionCallArguments' is only supported on the Vertex AI API and will be ignored with the current Google provider (${this.config.provider}). See https://docs.cloud.google.com/vertex-ai/generative-ai/docs/multimodal/function-calling#streaming-fc`
		});
		if ((googleOptions == null ? void 0 : googleOptions.serviceTier) && isVertexProvider) warnings.push({
			type: "other",
			message: "'serviceTier' is a Gemini API option and is not supported on Vertex AI. Use 'sharedRequestType' (and optionally 'requestType') instead. See https://docs.cloud.google.com/vertex-ai/generative-ai/docs/priority-paygo"
		});
		if (((googleOptions == null ? void 0 : googleOptions.sharedRequestType) || (googleOptions == null ? void 0 : googleOptions.requestType)) && !isVertexProvider) warnings.push({
			type: "other",
			message: `'sharedRequestType' and 'requestType' are Vertex AI options and are ignored with the current Google provider (${this.config.provider}).`
		});
		const vertexPaygoHeaders = isVertexProvider && ((googleOptions == null ? void 0 : googleOptions.sharedRequestType) || (googleOptions == null ? void 0 : googleOptions.requestType)) ? {
			...googleOptions.sharedRequestType && { "X-Vertex-AI-LLM-Shared-Request-Type": googleOptions.sharedRequestType },
			...googleOptions.requestType && { "X-Vertex-AI-LLM-Request-Type": googleOptions.requestType }
		} : void 0;
		const bodyServiceTier = isVertexProvider ? void 0 : googleOptions == null ? void 0 : googleOptions.serviceTier;
		let imageConfig = googleOptions == null ? void 0 : googleOptions.imageConfig;
		if (imageConfig != null && !isVertexProvider) {
			const { personGeneration, prominentPeople, imageOutputOptions, ...geminiApiImageConfig } = imageConfig;
			const droppedImageConfigFields = Object.entries({
				personGeneration,
				prominentPeople,
				imageOutputOptions
			}).filter(([, value]) => value != null).map(([key]) => `'imageConfig.${key}'`);
			if (droppedImageConfigFields.length > 0) {
				warnings.push({
					type: "other",
					message: `${droppedImageConfigFields.join(", ")} ${droppedImageConfigFields.length === 1 ? "is a Vertex AI option and is" : "are Vertex AI options and are"} ignored with the current Google provider (${this.config.provider}).`
				});
				imageConfig = geminiApiImageConfig;
			}
		}
		const isGemmaModel = this.modelId.toLowerCase().startsWith("gemma-");
		const isGemini25DeveloperApiModel = !isVertexProvider && gemini25ModelPattern2.test(this.modelId);
		if (isGemini25DeveloperApiModel && frequencyPenalty != null) warnings.push({
			type: "unsupported",
			feature: "frequencyPenalty"
		});
		if (isGemini25DeveloperApiModel && presencePenalty != null) warnings.push({
			type: "unsupported",
			feature: "presencePenalty"
		});
		const { usesGemini3Features } = getGoogleModelCapabilities(this.modelId);
		const { contents, systemInstruction } = convertToGoogleMessages(prompt, {
			isGemmaModel,
			isGemini3Model: usesGemini3Features,
			onWarning: (warning) => warnings.push(warning),
			providerOptionsNames,
			supportsFunctionResponseParts: usesGemini3Features,
			includeFunctionCallIds: !isVertexProvider
		});
		const { tools: googleTools2, toolConfig: googleToolConfig, toolWarnings } = prepareTools({
			tools,
			toolChoice,
			modelId: this.modelId,
			isVertexProvider
		});
		const resolvedThinking = resolveThinkingConfig({
			reasoning,
			modelId: this.modelId,
			warnings
		});
		const thinkingConfig = (googleOptions == null ? void 0 : googleOptions.thinkingConfig) || resolvedThinking ? {
			...resolvedThinking,
			...googleOptions == null ? void 0 : googleOptions.thinkingConfig
		} : void 0;
		const streamFunctionCallArguments = isStreaming && isVertexProvider ? (_a = googleOptions == null ? void 0 : googleOptions.streamFunctionCallArguments) != null ? _a : false : void 0;
		const safetyThreshold = googleOptions == null ? void 0 : googleOptions.threshold;
		const safetySettings = (_b = googleOptions == null ? void 0 : googleOptions.safetySettings) != null ? _b : safetyThreshold != null ? configurableSafetySettingCategories.map((category) => ({
			category,
			threshold: safetyThreshold
		})) : void 0;
		const toolConfig = googleToolConfig || streamFunctionCallArguments || (googleOptions == null ? void 0 : googleOptions.retrievalConfig) ? {
			...googleToolConfig,
			...streamFunctionCallArguments && { functionCallingConfig: {
				...googleToolConfig == null ? void 0 : googleToolConfig.functionCallingConfig,
				streamFunctionCallArguments: true
			} },
			...(googleOptions == null ? void 0 : googleOptions.retrievalConfig) && { retrievalConfig: googleOptions.retrievalConfig }
		} : void 0;
		return {
			args: {
				generationConfig: {
					maxOutputTokens,
					temperature,
					topK,
					topP,
					frequencyPenalty: isGemini25DeveloperApiModel ? void 0 : frequencyPenalty,
					presencePenalty: isGemini25DeveloperApiModel ? void 0 : presencePenalty,
					stopSequences,
					seed,
					responseMimeType: (responseFormat == null ? void 0 : responseFormat.type) === "json" ? "application/json" : void 0,
					responseSchema: (responseFormat == null ? void 0 : responseFormat.type) === "json" && responseFormat.schema != null && ((_c = googleOptions == null ? void 0 : googleOptions.structuredOutputs) != null ? _c : true) ? convertJSONSchemaToOpenAPISchema(responseFormat.schema) : void 0,
					...(googleOptions == null ? void 0 : googleOptions.audioTimestamp) && { audioTimestamp: googleOptions.audioTimestamp },
					responseModalities: googleOptions == null ? void 0 : googleOptions.responseModalities,
					thinkingConfig,
					...(googleOptions == null ? void 0 : googleOptions.mediaResolution) && { mediaResolution: googleOptions.mediaResolution },
					...imageConfig && { imageConfig }
				},
				contents,
				systemInstruction: isGemmaModel ? void 0 : systemInstruction,
				safetySettings,
				tools: googleTools2,
				toolConfig,
				cachedContent: googleOptions == null ? void 0 : googleOptions.cachedContent,
				labels: googleOptions == null ? void 0 : googleOptions.labels,
				serviceTier: bodyServiceTier
			},
			warnings: [...warnings, ...toolWarnings],
			providerOptionsNames,
			extraHeaders: vertexPaygoHeaders
		};
	}
	convertGenerateContentResponse({ response, warnings, providerOptionsNames }) {
		var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s;
		const wrapProviderMetadata = (payload) => Object.fromEntries(providerOptionsNames.map((name) => [name, payload]));
		const candidate = (_a = response.candidates) == null ? void 0 : _a[0];
		const promptBlockReason = (_b = response.promptFeedback) == null ? void 0 : _b.blockReason;
		const isPromptBlocked = (candidate == null ? void 0 : candidate.finishReason) == null && promptBlockReason != null;
		const rawFinishReason = (_d = (_c = candidate == null ? void 0 : candidate.finishReason) != null ? _c : promptBlockReason) != null ? _d : void 0;
		const content = [];
		const parts = (_f = (_e = candidate == null ? void 0 : candidate.content) == null ? void 0 : _e.parts) != null ? _f : [];
		const usageMetadata = response.usageMetadata;
		let lastCodeExecutionToolCallId;
		let lastServerToolCallId;
		for (const part of parts) if ("executableCode" in part && ((_g = part.executableCode) == null ? void 0 : _g.code)) {
			const toolCallId = this.config.generateId();
			lastCodeExecutionToolCallId = toolCallId;
			content.push({
				type: "tool-call",
				toolCallId,
				toolName: "code_execution",
				input: JSON.stringify(part.executableCode),
				providerExecuted: true
			});
		} else if ("codeExecutionResult" in part && part.codeExecutionResult) content.push({
			type: "tool-result",
			toolCallId: lastCodeExecutionToolCallId,
			toolName: "code_execution",
			result: {
				outcome: part.codeExecutionResult.outcome,
				output: (_h = part.codeExecutionResult.output) != null ? _h : ""
			}
		});
		else if ("text" in part && part.text != null) {
			const thoughtSignatureMetadata = part.thoughtSignature ? wrapProviderMetadata({ thoughtSignature: part.thoughtSignature }) : void 0;
			if (part.text.length === 0) {
				if (thoughtSignatureMetadata != null && content.length > 0) {
					const lastContent = content[content.length - 1];
					lastContent.providerMetadata = thoughtSignatureMetadata;
				}
			} else content.push({
				type: part.thought === true ? "reasoning" : "text",
				text: part.text,
				providerMetadata: thoughtSignatureMetadata
			});
		} else if ("functionCall" in part && part.functionCall.name != null) content.push({
			type: "tool-call",
			toolCallId: part.functionCall.id || this.config.generateId(),
			toolName: part.functionCall.name,
			input: JSON.stringify((_i = part.functionCall.args) != null ? _i : {}),
			providerMetadata: part.thoughtSignature ? wrapProviderMetadata({ thoughtSignature: part.thoughtSignature }) : void 0
		});
		else if ("inlineData" in part) {
			const hasThought = part.thought === true;
			const hasThoughtSignature = !!part.thoughtSignature;
			content.push({
				type: hasThought ? "reasoning-file" : "file",
				data: {
					type: "data",
					data: part.inlineData.data
				},
				mediaType: part.inlineData.mimeType,
				providerMetadata: hasThoughtSignature ? wrapProviderMetadata({ thoughtSignature: part.thoughtSignature }) : void 0
			});
		} else if ("toolCall" in part && part.toolCall) {
			const toolCallId = part.toolCall.id || this.config.generateId();
			lastServerToolCallId = toolCallId;
			content.push({
				type: "tool-call",
				toolCallId,
				toolName: `server:${part.toolCall.toolType}`,
				input: JSON.stringify((_j = part.toolCall.args) != null ? _j : {}),
				providerExecuted: true,
				dynamic: true,
				providerMetadata: part.thoughtSignature ? wrapProviderMetadata({
					thoughtSignature: part.thoughtSignature,
					serverToolCallId: toolCallId,
					serverToolType: part.toolCall.toolType
				}) : wrapProviderMetadata({
					serverToolCallId: toolCallId,
					serverToolType: part.toolCall.toolType
				})
			});
		} else if ("toolResponse" in part && part.toolResponse) {
			const responseToolCallId = lastServerToolCallId || part.toolResponse.id || this.config.generateId();
			content.push({
				type: "tool-result",
				toolCallId: responseToolCallId,
				toolName: `server:${part.toolResponse.toolType}`,
				result: (_k = part.toolResponse.response) != null ? _k : {},
				providerMetadata: part.thoughtSignature ? wrapProviderMetadata({
					thoughtSignature: part.thoughtSignature,
					serverToolCallId: responseToolCallId,
					serverToolType: part.toolResponse.toolType
				}) : wrapProviderMetadata({
					serverToolCallId: responseToolCallId,
					serverToolType: part.toolResponse.toolType
				})
			});
			lastServerToolCallId = void 0;
		}
		const sources = (_l = extractSources({
			groundingMetadata: candidate == null ? void 0 : candidate.groundingMetadata,
			generateId: this.config.generateId
		})) != null ? _l : [];
		for (const source of sources) content.push(source);
		return {
			content,
			finishReason: {
				unified: isPromptBlocked ? "content-filter" : mapGoogleFinishReason({
					finishReason: rawFinishReason,
					hasToolCalls: content.some((part) => part.type === "tool-call" && !part.providerExecuted)
				}),
				raw: rawFinishReason
			},
			usage: convertGoogleUsage(usageMetadata),
			warnings,
			providerMetadata: wrapProviderMetadata({
				promptFeedback: (_m = response.promptFeedback) != null ? _m : null,
				groundingMetadata: (_n = candidate == null ? void 0 : candidate.groundingMetadata) != null ? _n : null,
				urlContextMetadata: (_o = candidate == null ? void 0 : candidate.urlContextMetadata) != null ? _o : null,
				safetyRatings: (_p = candidate == null ? void 0 : candidate.safetyRatings) != null ? _p : null,
				usageMetadata: usageMetadata != null ? usageMetadata : null,
				finishMessage: (_q = candidate == null ? void 0 : candidate.finishMessage) != null ? _q : null,
				serviceTier: (_r = usageMetadata == null ? void 0 : usageMetadata.serviceTier) != null ? _r : null
			}),
			response: { id: (_s = response.responseId) != null ? _s : void 0 }
		};
	}
	async doGenerate(options) {
		const { args, warnings, providerOptionsNames, extraHeaders } = await this.getArgs(options);
		const mergedHeaders = combineHeaders(this.config.headers ? await resolve(this.config.headers) : void 0, options.headers, extraHeaders);
		const { responseHeaders, value: response, rawValue: rawResponse } = await postJsonToApi({
			url: `${this.config.baseURL}/${getModelPath(this.modelId)}:generateContent`,
			headers: mergedHeaders,
			body: args,
			failedResponseHandler: googleFailedResponseHandler,
			successfulResponseHandler: createJsonResponseHandler(responseSchema),
			abortSignal: options.abortSignal,
			fetch: this.config.fetch
		});
		const result = this.convertGenerateContentResponse({
			response,
			warnings,
			providerOptionsNames
		});
		return {
			...result,
			request: { body: args },
			response: {
				...result.response,
				headers: responseHeaders,
				body: rawResponse
			}
		};
	}
	async doStream(options) {
		const { args, warnings, providerOptionsNames, extraHeaders } = await this.getArgs(options, { isStreaming: true });
		const wrapProviderMetadata = (payload) => Object.fromEntries(providerOptionsNames.map((name) => [name, payload]));
		const headers = combineHeaders(this.config.headers ? await resolve(this.config.headers) : void 0, options.headers, extraHeaders);
		const { responseHeaders, value: response } = await postJsonToApi({
			url: `${this.config.baseURL}/${getModelPath(this.modelId)}:streamGenerateContent?alt=sse`,
			headers,
			body: args,
			failedResponseHandler: googleFailedResponseHandler,
			successfulResponseHandler: createEventSourceResponseHandler(chunkSchema),
			abortSignal: options.abortSignal,
			fetch: this.config.fetch
		});
		let finishReason = {
			unified: "other",
			raw: void 0
		};
		let usage = void 0;
		let providerMetadata = void 0;
		let lastGroundingMetadata = null;
		let lastUrlContextMetadata = null;
		const generateId4 = this.config.generateId;
		let hasToolCalls = false;
		let hasEmittedResponseMetadata = false;
		let currentTextBlockId = null;
		let currentReasoningBlockId = null;
		let blockCounter = 0;
		const emittedSourceUrls = /* @__PURE__ */ new Set();
		let lastCodeExecutionToolCallId;
		let lastServerToolCallId;
		const activeStreamingToolCalls = [];
		const finishActiveStreamingToolCall = (controller) => {
			const active = activeStreamingToolCalls.pop();
			if (active == null) return;
			const { finalJSON, closingDelta } = active.accumulator.finalize();
			if (closingDelta.length > 0) controller.enqueue({
				type: "tool-input-delta",
				id: active.toolCallId,
				delta: closingDelta,
				providerMetadata: active.providerMetadata
			});
			controller.enqueue({
				type: "tool-input-end",
				id: active.toolCallId,
				providerMetadata: active.providerMetadata
			});
			controller.enqueue({
				type: "tool-call",
				toolCallId: active.toolCallId,
				toolName: active.toolName,
				input: finalJSON,
				providerMetadata: active.providerMetadata
			});
			hasToolCalls = true;
		};
		return {
			stream: response.pipeThrough(new TransformStream({
				start(controller) {
					controller.enqueue({
						type: "stream-start",
						warnings
					});
				},
				transform(chunk, controller) {
					var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q;
					if (options.includeRawChunks) controller.enqueue({
						type: "raw",
						rawValue: chunk.rawValue
					});
					if (!chunk.success) {
						controller.enqueue({
							type: "error",
							error: chunk.error
						});
						return;
					}
					const value = chunk.value;
					if (!hasEmittedResponseMetadata && value.responseId != null) {
						hasEmittedResponseMetadata = true;
						controller.enqueue({
							type: "response-metadata",
							id: value.responseId
						});
					}
					const usageMetadata = value.usageMetadata;
					if (usageMetadata != null) usage = usageMetadata;
					const candidate = (_a = value.candidates) == null ? void 0 : _a[0];
					if (candidate == null) {
						const promptBlockReason2 = (_b = value.promptFeedback) == null ? void 0 : _b.blockReason;
						if (promptBlockReason2 != null) {
							finishReason = {
								unified: "content-filter",
								raw: promptBlockReason2
							};
							providerMetadata = wrapProviderMetadata({
								promptFeedback: (_c = value.promptFeedback) != null ? _c : null,
								groundingMetadata: lastGroundingMetadata,
								urlContextMetadata: lastUrlContextMetadata,
								safetyRatings: null,
								usageMetadata: usageMetadata != null ? usageMetadata : null,
								finishMessage: null,
								serviceTier: (_d = usage == null ? void 0 : usage.serviceTier) != null ? _d : null
							});
						}
						return;
					}
					const content = candidate.content;
					if (candidate.groundingMetadata != null) lastGroundingMetadata = candidate.groundingMetadata;
					if (candidate.urlContextMetadata != null) lastUrlContextMetadata = candidate.urlContextMetadata;
					const sources = extractSources({
						groundingMetadata: candidate.groundingMetadata,
						generateId: generateId4
					});
					if (sources != null) {
						for (const source of sources) if (source.sourceType === "url" && !emittedSourceUrls.has(source.url)) {
							emittedSourceUrls.add(source.url);
							controller.enqueue(source);
						}
					}
					if (content != null) {
						const parts = (_e = content.parts) != null ? _e : [];
						for (const part of parts) if ("executableCode" in part && ((_f = part.executableCode) == null ? void 0 : _f.code)) {
							const toolCallId = generateId4();
							lastCodeExecutionToolCallId = toolCallId;
							controller.enqueue({
								type: "tool-call",
								toolCallId,
								toolName: "code_execution",
								input: JSON.stringify(part.executableCode),
								providerExecuted: true
							});
						} else if ("codeExecutionResult" in part && part.codeExecutionResult) {
							const toolCallId = lastCodeExecutionToolCallId;
							if (toolCallId) controller.enqueue({
								type: "tool-result",
								toolCallId,
								toolName: "code_execution",
								result: {
									outcome: part.codeExecutionResult.outcome,
									output: (_g = part.codeExecutionResult.output) != null ? _g : ""
								}
							});
						} else if ("text" in part && part.text != null) {
							const thoughtSignatureMetadata = part.thoughtSignature ? wrapProviderMetadata({ thoughtSignature: part.thoughtSignature }) : void 0;
							if (part.text.length === 0) {
								if (thoughtSignatureMetadata != null && currentTextBlockId !== null) controller.enqueue({
									type: "text-delta",
									id: currentTextBlockId,
									delta: "",
									providerMetadata: thoughtSignatureMetadata
								});
							} else if (part.thought === true) {
								if (currentTextBlockId !== null) {
									controller.enqueue({
										type: "text-end",
										id: currentTextBlockId
									});
									currentTextBlockId = null;
								}
								if (currentReasoningBlockId === null) {
									currentReasoningBlockId = String(blockCounter++);
									controller.enqueue({
										type: "reasoning-start",
										id: currentReasoningBlockId,
										providerMetadata: thoughtSignatureMetadata
									});
								}
								controller.enqueue({
									type: "reasoning-delta",
									id: currentReasoningBlockId,
									delta: part.text,
									providerMetadata: thoughtSignatureMetadata
								});
							} else {
								if (currentReasoningBlockId !== null) {
									controller.enqueue({
										type: "reasoning-end",
										id: currentReasoningBlockId
									});
									currentReasoningBlockId = null;
								}
								if (currentTextBlockId === null) {
									currentTextBlockId = String(blockCounter++);
									controller.enqueue({
										type: "text-start",
										id: currentTextBlockId,
										providerMetadata: thoughtSignatureMetadata
									});
								}
								controller.enqueue({
									type: "text-delta",
									id: currentTextBlockId,
									delta: part.text,
									providerMetadata: thoughtSignatureMetadata
								});
							}
						} else if ("inlineData" in part) {
							if (currentTextBlockId !== null) {
								controller.enqueue({
									type: "text-end",
									id: currentTextBlockId
								});
								currentTextBlockId = null;
							}
							if (currentReasoningBlockId !== null) {
								controller.enqueue({
									type: "reasoning-end",
									id: currentReasoningBlockId
								});
								currentReasoningBlockId = null;
							}
							const hasThought = part.thought === true;
							const fileMeta = !!part.thoughtSignature ? wrapProviderMetadata({ thoughtSignature: part.thoughtSignature }) : void 0;
							controller.enqueue({
								type: hasThought ? "reasoning-file" : "file",
								mediaType: part.inlineData.mimeType,
								data: {
									type: "data",
									data: part.inlineData.data
								},
								providerMetadata: fileMeta
							});
						} else if ("toolCall" in part && part.toolCall) {
							const toolCallId = part.toolCall.id || generateId4();
							lastServerToolCallId = toolCallId;
							const serverMeta = wrapProviderMetadata({
								...part.thoughtSignature ? { thoughtSignature: part.thoughtSignature } : {},
								serverToolCallId: toolCallId,
								serverToolType: part.toolCall.toolType
							});
							controller.enqueue({
								type: "tool-call",
								toolCallId,
								toolName: `server:${part.toolCall.toolType}`,
								input: JSON.stringify((_h = part.toolCall.args) != null ? _h : {}),
								providerExecuted: true,
								dynamic: true,
								providerMetadata: serverMeta
							});
						} else if ("toolResponse" in part && part.toolResponse) {
							const responseToolCallId = lastServerToolCallId || part.toolResponse.id || generateId4();
							const serverMeta = wrapProviderMetadata({
								...part.thoughtSignature ? { thoughtSignature: part.thoughtSignature } : {},
								serverToolCallId: responseToolCallId,
								serverToolType: part.toolResponse.toolType
							});
							controller.enqueue({
								type: "tool-result",
								toolCallId: responseToolCallId,
								toolName: `server:${part.toolResponse.toolType}`,
								result: (_i = part.toolResponse.response) != null ? _i : {},
								providerMetadata: serverMeta
							});
							lastServerToolCallId = void 0;
						}
						for (const part of parts) {
							if (!("functionCall" in part)) continue;
							const providerMeta = part.thoughtSignature ? wrapProviderMetadata({ thoughtSignature: part.thoughtSignature }) : void 0;
							const isStreamingChunk = part.functionCall.partialArgs != null || part.functionCall.name != null && part.functionCall.willContinue === true;
							const isTerminalChunk = part.functionCall.name == null && part.functionCall.args == null && part.functionCall.partialArgs == null && part.functionCall.willContinue == null;
							const isCompleteCall = part.functionCall.name != null && part.functionCall.args != null && part.functionCall.partialArgs == null;
							const isNoArgsCompleteCall = part.functionCall.name != null && part.functionCall.args == null && part.functionCall.partialArgs == null && part.functionCall.willContinue !== true;
							if (isStreamingChunk) {
								if (part.functionCall.name != null) {
									const toolCallId = part.functionCall.id || generateId4();
									const accumulator = new GoogleJSONAccumulator();
									activeStreamingToolCalls.push({
										toolCallId,
										toolName: part.functionCall.name,
										accumulator,
										providerMetadata: providerMeta
									});
									controller.enqueue({
										type: "tool-input-start",
										id: toolCallId,
										toolName: part.functionCall.name,
										providerMetadata: providerMeta
									});
									if (part.functionCall.partialArgs != null) {
										const partialArgs = part.functionCall.partialArgs;
										const { textDelta } = accumulator.processPartialArgs(partialArgs);
										if (textDelta.length > 0) controller.enqueue({
											type: "tool-input-delta",
											id: toolCallId,
											delta: textDelta,
											providerMetadata: providerMeta
										});
										if (part.functionCall.willContinue !== true && partialArgs.every((arg) => arg.willContinue !== true)) finishActiveStreamingToolCall(controller);
									}
								} else if (part.functionCall.partialArgs != null && activeStreamingToolCalls.length > 0) {
									const active = activeStreamingToolCalls[activeStreamingToolCalls.length - 1];
									const partialArgs = part.functionCall.partialArgs;
									const { textDelta } = active.accumulator.processPartialArgs(partialArgs);
									if (textDelta.length > 0) controller.enqueue({
										type: "tool-input-delta",
										id: active.toolCallId,
										delta: textDelta,
										providerMetadata: providerMeta
									});
									if (part.functionCall.willContinue !== true && partialArgs.every((arg) => arg.willContinue !== true)) finishActiveStreamingToolCall(controller);
								}
							} else if (isTerminalChunk && activeStreamingToolCalls.length > 0) finishActiveStreamingToolCall(controller);
							else if (isCompleteCall) {
								const toolCallId = part.functionCall.id || generateId4();
								const toolName = part.functionCall.name;
								const args2 = typeof part.functionCall.args === "string" ? part.functionCall.args : JSON.stringify((_j = part.functionCall.args) != null ? _j : {});
								controller.enqueue({
									type: "tool-input-start",
									id: toolCallId,
									toolName,
									providerMetadata: providerMeta
								});
								controller.enqueue({
									type: "tool-input-delta",
									id: toolCallId,
									delta: args2,
									providerMetadata: providerMeta
								});
								controller.enqueue({
									type: "tool-input-end",
									id: toolCallId,
									providerMetadata: providerMeta
								});
								controller.enqueue({
									type: "tool-call",
									toolCallId,
									toolName,
									input: args2,
									providerMetadata: providerMeta
								});
								hasToolCalls = true;
							} else if (isNoArgsCompleteCall) {
								const toolCallId = part.functionCall.id || generateId4();
								const toolName = part.functionCall.name;
								controller.enqueue({
									type: "tool-input-start",
									id: toolCallId,
									toolName,
									providerMetadata: providerMeta
								});
								controller.enqueue({
									type: "tool-input-end",
									id: toolCallId,
									providerMetadata: providerMeta
								});
								controller.enqueue({
									type: "tool-call",
									toolCallId,
									toolName,
									input: "{}",
									providerMetadata: providerMeta
								});
								hasToolCalls = true;
							}
						}
					}
					const promptBlockReason = (_k = value.promptFeedback) == null ? void 0 : _k.blockReason;
					const isPromptBlocked = candidate.finishReason == null && promptBlockReason != null;
					const rawFinishReason = (_m = (_l = candidate.finishReason) != null ? _l : promptBlockReason) != null ? _m : void 0;
					if (rawFinishReason != null) {
						finishReason = {
							unified: isPromptBlocked ? "content-filter" : mapGoogleFinishReason({
								finishReason: rawFinishReason,
								hasToolCalls
							}),
							raw: rawFinishReason
						};
						providerMetadata = wrapProviderMetadata({
							promptFeedback: (_n = value.promptFeedback) != null ? _n : null,
							groundingMetadata: lastGroundingMetadata,
							urlContextMetadata: lastUrlContextMetadata,
							safetyRatings: (_o = candidate.safetyRatings) != null ? _o : null,
							usageMetadata: usageMetadata != null ? usageMetadata : null,
							finishMessage: (_p = candidate.finishMessage) != null ? _p : null,
							serviceTier: (_q = usage == null ? void 0 : usage.serviceTier) != null ? _q : null
						});
					}
				},
				flush(controller) {
					if (currentTextBlockId !== null) controller.enqueue({
						type: "text-end",
						id: currentTextBlockId
					});
					if (currentReasoningBlockId !== null) controller.enqueue({
						type: "reasoning-end",
						id: currentReasoningBlockId
					});
					controller.enqueue({
						type: "finish",
						finishReason,
						usage: convertGoogleUsage(usage),
						providerMetadata
					});
				}
			})),
			response: { headers: responseHeaders },
			request: { body: args }
		};
	}
};
function getMaxOutputTokensForGemini25Model() {
	return 65536;
}
function getMaxThinkingTokensForGemini25Model(modelId) {
	const id = modelId.toLowerCase();
	if (id.includes("2.5-pro") || id.includes("gemini-3-pro-image")) return 32768;
	return 24576;
}
function resolveThinkingConfig({ reasoning, modelId, warnings }) {
	if (!isCustomReasoning(reasoning)) return;
	if (getGoogleModelCapabilities(modelId).usesGemini3Features && !modelId.includes("gemini-3-pro-image")) return resolveGemini3ThinkingConfig({
		reasoning,
		modelId,
		warnings
	});
	return resolveGemini25ThinkingConfig({
		reasoning,
		modelId,
		warnings
	});
}
function resolveGemini3ThinkingConfig({ reasoning, modelId, warnings }) {
	const minimumThinkingLevel = getMinimumThinkingLevelForGemini3Model(modelId);
	if (reasoning === "none") return { thinkingLevel: minimumThinkingLevel };
	const thinkingLevel = mapReasoningToProviderEffort({
		reasoning,
		effortMap: {
			minimal: minimumThinkingLevel,
			low: "low",
			medium: "medium",
			high: "high",
			xhigh: "high"
		},
		warnings
	});
	if (thinkingLevel == null) return;
	return { thinkingLevel };
}
function getMinimumThinkingLevelForGemini3Model(modelId) {
	var _a;
	const modelName = (_a = modelId.split("/").at(-1)) == null ? void 0 : _a.toLowerCase();
	if (modelName === "gemini-flash-latest") return "low";
	const versionMatch = /^gemini-(\d+)\.(\d+)-flash(?:$|-(?!lite(?:-|$)))/.exec(modelName != null ? modelName : "");
	if (versionMatch == null) return "minimal";
	const majorVersion = Number(versionMatch[1]);
	const minorVersion = Number(versionMatch[2]);
	return majorVersion > 3 || majorVersion === 3 && minorVersion >= 7 ? "low" : "minimal";
}
function resolveGemini25ThinkingConfig({ reasoning, modelId, warnings }) {
	if (reasoning === "none") return { thinkingBudget: 0 };
	const thinkingBudget = mapReasoningToProviderBudget({
		reasoning,
		maxOutputTokens: getMaxOutputTokensForGemini25Model(),
		maxReasoningBudget: getMaxThinkingTokensForGemini25Model(modelId),
		minReasoningBudget: 0,
		warnings
	});
	if (thinkingBudget == null) return;
	return { thinkingBudget };
}
function extractSources({ groundingMetadata, generateId: generateId4 }) {
	var _a, _b, _c, _d, _e, _f;
	if (!(groundingMetadata == null ? void 0 : groundingMetadata.groundingChunks)) return;
	const sources = [];
	for (const chunk of groundingMetadata.groundingChunks) if (chunk.web != null) sources.push({
		type: "source",
		sourceType: "url",
		id: generateId4(),
		url: chunk.web.uri,
		title: (_a = chunk.web.title) != null ? _a : void 0
	});
	else if (chunk.image != null) sources.push({
		type: "source",
		sourceType: "url",
		id: generateId4(),
		url: chunk.image.sourceUri,
		title: (_b = chunk.image.title) != null ? _b : void 0
	});
	else if (chunk.retrievedContext != null) {
		const uri = chunk.retrievedContext.uri;
		const fileSearchStore = chunk.retrievedContext.fileSearchStore;
		if (uri && (uri.startsWith("http://") || uri.startsWith("https://"))) sources.push({
			type: "source",
			sourceType: "url",
			id: generateId4(),
			url: uri,
			title: (_c = chunk.retrievedContext.title) != null ? _c : void 0
		});
		else if (uri) {
			const title = (_d = chunk.retrievedContext.title) != null ? _d : "Unknown Document";
			let mediaType = "application/octet-stream";
			let filename = void 0;
			if (uri.endsWith(".pdf")) {
				mediaType = "application/pdf";
				filename = uri.split("/").pop();
			} else if (uri.endsWith(".txt")) {
				mediaType = "text/plain";
				filename = uri.split("/").pop();
			} else if (uri.endsWith(".docx")) {
				mediaType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
				filename = uri.split("/").pop();
			} else if (uri.endsWith(".doc")) {
				mediaType = "application/msword";
				filename = uri.split("/").pop();
			} else if (uri.match(/\.(md|markdown)$/)) {
				mediaType = "text/markdown";
				filename = uri.split("/").pop();
			} else filename = uri.split("/").pop();
			sources.push({
				type: "source",
				sourceType: "document",
				id: generateId4(),
				mediaType,
				title,
				filename
			});
		} else if (fileSearchStore) {
			const title = (_e = chunk.retrievedContext.title) != null ? _e : "Unknown Document";
			sources.push({
				type: "source",
				sourceType: "document",
				id: generateId4(),
				mediaType: "application/octet-stream",
				title,
				filename: fileSearchStore.split("/").pop()
			});
		}
	} else if (chunk.maps != null) {
		if (chunk.maps.uri) sources.push({
			type: "source",
			sourceType: "url",
			id: generateId4(),
			url: chunk.maps.uri,
			title: (_f = chunk.maps.title) != null ? _f : void 0
		});
	}
	return sources.length > 0 ? sources : void 0;
}
var getGroundingMetadataSchema = () => object({
	webSearchQueries: array(string()).nullish(),
	imageSearchQueries: array(string()).nullish(),
	retrievalQueries: array(string()).nullish(),
	searchEntryPoint: object({ renderedContent: string() }).nullish(),
	groundingChunks: array(object({
		web: object({
			uri: string(),
			title: string().nullish()
		}).nullish(),
		image: object({
			sourceUri: string(),
			imageUri: string(),
			title: string().nullish(),
			domain: string().nullish()
		}).nullish(),
		retrievedContext: object({
			uri: string().nullish(),
			title: string().nullish(),
			text: string().nullish(),
			fileSearchStore: string().nullish()
		}).nullish(),
		maps: object({
			uri: string().nullish(),
			title: string().nullish(),
			text: string().nullish(),
			placeId: string().nullish()
		}).nullish()
	})).nullish(),
	groundingSupports: array(object({
		segment: object({
			startIndex: number().nullish(),
			endIndex: number().nullish(),
			text: string().nullish()
		}).nullish(),
		segment_text: string().nullish(),
		groundingChunkIndices: array(number()).nullish(),
		supportChunkIndices: array(number()).nullish(),
		confidenceScores: array(number()).nullish(),
		confidenceScore: array(number()).nullish()
	})).nullish(),
	retrievalMetadata: union([object({ webDynamicRetrievalScore: number() }), object({})]).nullish()
});
var partialArgSchema = object({
	jsonPath: string(),
	stringValue: string().nullish(),
	numberValue: number().nullish(),
	boolValue: boolean().nullish(),
	nullValue: unknown().nullish(),
	willContinue: boolean().nullish()
});
var getContentSchema = () => object({ parts: array(union([
	object({
		functionCall: object({
			id: string().nullish(),
			name: string().nullish(),
			args: unknown().nullish(),
			partialArgs: array(partialArgSchema).nullish(),
			willContinue: boolean().nullish()
		}),
		thoughtSignature: string().nullish()
	}),
	object({
		inlineData: object({
			mimeType: string(),
			data: string()
		}),
		thought: boolean().nullish(),
		thoughtSignature: string().nullish()
	}),
	object({
		toolCall: object({
			toolType: string(),
			args: unknown().nullish(),
			id: string()
		}),
		thoughtSignature: string().nullish()
	}),
	object({
		toolResponse: object({
			toolType: string(),
			response: unknown().nullish(),
			id: string()
		}),
		thoughtSignature: string().nullish()
	}),
	object({
		executableCode: object({
			language: string(),
			code: string()
		}).nullish(),
		codeExecutionResult: object({
			outcome: string(),
			output: string().nullish()
		}).nullish(),
		text: string().nullish(),
		thought: boolean().nullish(),
		thoughtSignature: string().nullish()
	})
])).nullish() });
var getSafetyRatingSchema = () => object({
	category: string().nullish(),
	probability: string().nullish(),
	probabilityScore: number().nullish(),
	severity: string().nullish(),
	severityScore: number().nullish(),
	blocked: boolean().nullish()
});
var tokenDetailsSchema = array(object({
	modality: string(),
	tokenCount: number()
}).loose()).nullish();
var usageSchema = object({
	cachedContentTokenCount: number().nullish(),
	thoughtsTokenCount: number().nullish(),
	promptTokenCount: number().nullish(),
	candidatesTokenCount: number().nullish(),
	toolUsePromptTokenCount: number().nullish(),
	totalTokenCount: number().nullish(),
	trafficType: string().nullish(),
	serviceTier: string().nullish(),
	promptTokensDetails: tokenDetailsSchema,
	cacheTokensDetails: tokenDetailsSchema,
	candidatesTokensDetails: tokenDetailsSchema,
	toolUsePromptTokensDetails: tokenDetailsSchema
}).loose();
var getUrlContextMetadataSchema = () => object({ urlMetadata: array(object({
	retrievedUrl: string(),
	urlRetrievalStatus: string()
})).nullish() });
var responseSchema = lazySchema(() => zodSchema(object({
	responseId: string().nullish(),
	candidates: array(object({
		content: getContentSchema().nullish().or(object({}).strict()),
		finishReason: string().nullish(),
		finishMessage: string().nullish(),
		safetyRatings: array(getSafetyRatingSchema()).nullish(),
		groundingMetadata: getGroundingMetadataSchema().nullish(),
		urlContextMetadata: getUrlContextMetadataSchema().nullish()
	})).nullish(),
	usageMetadata: usageSchema.nullish(),
	promptFeedback: object({
		blockReason: string().nullish(),
		safetyRatings: array(getSafetyRatingSchema()).nullish()
	}).nullish()
})));
var chunkSchema = lazySchema(() => zodSchema(object({
	responseId: string().nullish(),
	candidates: array(object({
		content: getContentSchema().nullish(),
		finishReason: string().nullish(),
		finishMessage: string().nullish(),
		safetyRatings: array(getSafetyRatingSchema()).nullish(),
		groundingMetadata: getGroundingMetadataSchema().nullish(),
		urlContextMetadata: getUrlContextMetadataSchema().nullish()
	})).nullish(),
	usageMetadata: usageSchema.nullish(),
	promptFeedback: object({
		blockReason: string().nullish(),
		safetyRatings: array(getSafetyRatingSchema()).nullish()
	}).nullish()
})));
var googleBatchInputFileMaxBytes = 2147483648;
var googleBatchInlineCreationMaxBytes = 2e7;
var supportedGoogleBatchContentTypes = /* @__PURE__ */ new Set([
	"text",
	"reasoning",
	"source"
]);
var googleRpcStatusSchema = object({
	code: union([number(), string()]).nullish(),
	message: string().nullish(),
	status: string().nullish()
});
var googleBatchStatsSchema = object({
	requestCount: union([string(), number()]).nullish(),
	successfulRequestCount: union([string(), number()]).nullish(),
	failedRequestCount: union([string(), number()]).nullish(),
	pendingRequestCount: union([string(), number()]).nullish()
});
var googleBatchOutputSchema = object({
	responsesFile: string().nullish(),
	inlinedResponses: object({ inlinedResponses: array(object({
		metadata: object({ key: string() }),
		response: unknown().nullish(),
		error: googleRpcStatusSchema.nullish()
	})) }).nullish()
});
var googleBatchOperationSchema = lazySchema(() => zodSchema(object({
	name: string(),
	metadata: object({
		state: string().nullish(),
		createTime: string().nullish(),
		batchStats: googleBatchStatsSchema.nullish(),
		output: googleBatchOutputSchema.nullish()
	}).nullish(),
	done: boolean().nullish(),
	error: googleRpcStatusSchema.nullish(),
	response: googleBatchOutputSchema.nullish()
})));
var googleFileUploadResponseSchema = lazySchema(() => zodSchema(object({ file: object({ name: string() }) })));
var googleBatchResultLineSchema = lazySchema(() => zodSchema(object({
	key: string(),
	response: unknown().nullish(),
	error: googleRpcStatusSchema.nullish()
})));
var googleBatchResponsePreviewSchema = lazySchema(() => zodSchema(object({
	candidates: array(unknown()).nullish(),
	promptFeedback: object({ blockReason: string().nullish() }).nullish()
})));
var GoogleBatchLanguageModel = class _GoogleBatchLanguageModel extends GoogleLanguageModel {
	static [WORKFLOW_SERIALIZE](model) {
		return GoogleLanguageModel[WORKFLOW_SERIALIZE](model);
	}
	static [WORKFLOW_DESERIALIZE](options) {
		return new _GoogleBatchLanguageModel(options.modelId, options.config);
	}
	constructor(modelId, config) {
		var _a;
		super(modelId, config);
		this.batchConfig = config;
		this.batchGenerateId = (_a = config.generateId) != null ? _a : generateId;
	}
	async experimental_doStartBatch(options) {
		const warnings = [];
		const displayName = `ai-sdk-batch-${this.batchGenerateId()}`;
		const inlinedRequests = [];
		const inlineBatchBody = { batch: {
			displayName,
			...options.webhookUrl != null && { webhookConfig: { uris: [options.webhookUrl] } },
			inputConfig: { requests: { requests: inlinedRequests } }
		} };
		const textEncoder = new TextEncoder();
		let inlineInputBytes = textEncoder.encode(JSON.stringify(inlineBatchBody)).byteLength;
		let fileParts;
		for (const request of options.requests) {
			const preparedRequest = await this.getArgs(request.options);
			const inlinedRequest = {
				request: preparedRequest.args,
				metadata: { key: request.id }
			};
			if (fileParts == null) {
				const requestBytes = textEncoder.encode(JSON.stringify(inlinedRequest)).byteLength;
				const nextInlineInputBytes = inlineInputBytes + requestBytes + (inlinedRequests.length > 0 ? 1 : 0);
				if (nextInlineInputBytes < googleBatchInlineCreationMaxBytes) {
					inlinedRequests.push(inlinedRequest);
					inlineInputBytes = nextInlineInputBytes;
				} else {
					fileParts = [];
					for (const previousRequest of inlinedRequests) fileParts.push(JSON.stringify({
						key: previousRequest.metadata.key,
						request: previousRequest.request
					}), "\n");
					inlinedRequests.length = 0;
					fileParts.push(JSON.stringify({
						key: request.id,
						request: preparedRequest.args
					}), "\n");
				}
			} else fileParts.push(JSON.stringify({
				key: request.id,
				request: preparedRequest.args
			}), "\n");
			for (const warning of preparedRequest.warnings) warnings.push({
				requestId: request.id,
				warning
			});
		}
		const headers = await this.getHeaders(options.headers);
		const createUrl = `${this.batchConfig.baseURL}/${getModelPath(this.modelId)}:batchGenerateContent`;
		let operation;
		if (fileParts == null) {
			const { value } = await postJsonToApi({
				url: createUrl,
				headers,
				body: inlineBatchBody,
				failedResponseHandler: googleFailedResponseHandler,
				successfulResponseHandler: createJsonResponseHandler(googleBatchOperationSchema),
				abortSignal: options.abortSignal,
				fetch: this.batchConfig.fetch
			});
			operation = value;
		} else {
			const inputFile = new Blob(fileParts, { type: "application/jsonl" });
			fileParts.length = 0;
			if (inputFile.size > googleBatchInputFileMaxBytes) throw new InvalidArgumentError({
				argument: "requests",
				message: "Google batch input files must not exceed 2 GB."
			});
			const { value: uploadUrl } = await postJsonToApi({
				url: `${this.getBaseOrigin()}/upload/v1beta/files`,
				headers: combineHeaders(headers, {
					"X-Goog-Upload-Protocol": "resumable",
					"X-Goog-Upload-Command": "start",
					"X-Goog-Upload-Header-Content-Length": String(inputFile.size),
					"X-Goog-Upload-Header-Content-Type": "application/jsonl"
				}),
				body: { file: { display_name: `${displayName}-input` } },
				failedResponseHandler: googleFailedResponseHandler,
				successfulResponseHandler: googleUploadUrlResponseHandler,
				abortSignal: options.abortSignal,
				fetch: this.batchConfig.fetch
			});
			const { value: uploadedFile } = await postToApi({
				url: uploadUrl,
				headers: {
					"X-Goog-Upload-Offset": "0",
					"X-Goog-Upload-Command": "upload, finalize",
					"Content-Type": "application/jsonl"
				},
				body: {
					content: inputFile,
					values: {
						byteLength: inputFile.size,
						mediaType: "application/jsonl"
					}
				},
				failedResponseHandler: googleFailedResponseHandler,
				successfulResponseHandler: createJsonResponseHandler(googleFileUploadResponseSchema),
				abortSignal: options.abortSignal,
				fetch: this.batchConfig.fetch
			});
			const { value } = await postJsonToApi({
				url: createUrl,
				headers,
				body: { batch: {
					displayName,
					...options.webhookUrl != null && { webhookConfig: { uris: [options.webhookUrl] } },
					inputConfig: { fileName: uploadedFile.file.name }
				} },
				failedResponseHandler: googleFailedResponseHandler,
				successfulResponseHandler: createJsonResponseHandler(googleBatchOperationSchema),
				abortSignal: options.abortSignal,
				fetch: this.batchConfig.fetch
			});
			operation = value;
		}
		return {
			batchId: operation.name,
			...convertGoogleBatchStatus(operation),
			warnings
		};
	}
	async experimental_doGetBatchStatus(options) {
		return convertGoogleBatchStatus(await this.retrieveBatch(options));
	}
	async experimental_doGetBatchResults(options) {
		var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
		const operation = await this.retrieveBatch(options);
		const batchStatus = convertGoogleBatchStatus(operation);
		if (batchStatus.status === "pending") throw new InvalidArgumentError({
			argument: "batchId",
			message: `Google batch "${options.batchId}" is not complete.`
		});
		const inlinedResponses = (_f = (_c = (_b = (_a = operation.metadata) == null ? void 0 : _a.output) == null ? void 0 : _b.inlinedResponses) == null ? void 0 : _c.inlinedResponses) != null ? _f : (_e = (_d = operation.response) == null ? void 0 : _d.inlinedResponses) == null ? void 0 : _e.inlinedResponses;
		if (inlinedResponses != null) return convertAsyncIteratorToReadableStream(this.iterateBatchResults(inlinedResponses.map((result) => ({
			key: result.metadata.key,
			response: result.response,
			error: result.error
		}))));
		const responsesFile = (_j = (_h = (_g = operation.metadata) == null ? void 0 : _g.output) == null ? void 0 : _h.responsesFile) != null ? _j : (_i = operation.response) == null ? void 0 : _i.responsesFile;
		if (responsesFile == null) {
			if (batchStatus.status === "completed") throw new InvalidResponseDataError({
				data: operation,
				message: `Google batch "${options.batchId}" completed without batch output.`
			});
			return new ReadableStream({ start(controller) {
				controller.close();
			} });
		}
		const encodedResponsesFile = responsesFile.split("/").map((segment) => encodeURIComponent(segment)).join("/");
		const { value: lines } = await getFromApi({
			url: `${this.getBaseOrigin()}/download/v1beta/${encodedResponsesFile}:download?alt=media`,
			headers: await this.getHeaders(options.headers),
			failedResponseHandler: googleFailedResponseHandler,
			successfulResponseHandler: createJsonLinesResponseHandler(googleBatchResultLineSchema),
			abortSignal: options.abortSignal,
			fetch: this.batchConfig.fetch,
			validateUrl: false
		});
		return convertAsyncIteratorToReadableStream(this.iterateBatchResults(lines));
	}
	async retrieveBatch(options) {
		const { value: operation } = await getFromApi({
			url: `${this.batchConfig.baseURL}/${options.batchId}`,
			headers: await this.getHeaders(options.headers),
			failedResponseHandler: googleFailedResponseHandler,
			successfulResponseHandler: createJsonResponseHandler(googleBatchOperationSchema),
			abortSignal: options.abortSignal,
			fetch: this.batchConfig.fetch,
			validateUrl: false
		});
		return operation;
	}
	async *iterateBatchResults(results) {
		var _a, _b, _c;
		for await (const line of results) {
			if (line.error != null) {
				const error = convertGoogleRpcError(line.error, "Google batch request failed.");
				const status = line.error.status === "CANCELLED" || String(line.error.code) === "1" ? "cancelled" : "failed";
				yield {
					id: line.key,
					status,
					error
				};
				continue;
			}
			if (line.response == null) {
				yield {
					id: line.key,
					status: "failed",
					error: {
						message: "Google returned a batch result without a response or error.",
						code: "invalid_batch_result"
					}
				};
				continue;
			}
			const preview = await safeValidateTypes({
				value: line.response,
				schema: googleBatchResponsePreviewSchema
			});
			if (preview.success && (preview.value.candidates == null || preview.value.candidates.length === 0)) {
				const promptFeedback = (_a = preview.value.promptFeedback) != null ? _a : void 0;
				const blockReason = (_b = promptFeedback == null ? void 0 : promptFeedback.blockReason) != null ? _b : void 0;
				yield {
					id: line.key,
					status: "failed",
					error: {
						message: blockReason == null ? "Google returned a batch response without any candidates." : `Google blocked the batch request (${blockReason}).`,
						code: blockReason == null ? "invalid_response" : "prompt_blocked",
						...blockReason != null ? { type: blockReason } : {}
					},
					...promptFeedback != null ? { providerMetadata: { google: { promptFeedback: { blockReason: (_c = promptFeedback.blockReason) != null ? _c : null } } } } : {}
				};
				continue;
			}
			const response = await safeValidateTypes({
				value: line.response,
				schema: responseSchema
			});
			if (!response.success) {
				yield {
					id: line.key,
					status: "failed",
					error: {
						message: "Google returned an invalid GenerateContent batch result.",
						code: "invalid_response"
					}
				};
				continue;
			}
			const result = this.convertGenerateContentResponse({
				response: response.value,
				warnings: [],
				providerOptionsNames: ["google"]
			});
			const unsupportedPart = result.content.find((part) => !supportedGoogleBatchContentTypes.has(part.type));
			if (unsupportedPart != null) {
				yield {
					id: line.key,
					status: "failed",
					error: {
						message: `Google returned a "${unsupportedPart.type}" content block, but that content is not supported in AI SDK text batches.`,
						code: "unsupported_content"
					}
				};
				continue;
			}
			yield {
				id: line.key,
				status: "succeeded",
				result
			};
		}
	}
	async getHeaders(headers) {
		return combineHeaders(this.batchConfig.headers ? await resolve(this.batchConfig.headers) : void 0, headers);
	}
	getBaseOrigin() {
		return this.batchConfig.baseURL.replace(/\/v1beta$/, "");
	}
};
function convertGoogleBatchStatus(operation) {
	var _a, _b, _c, _d, _e, _f;
	const rawStatus = (_b = (_a = operation.metadata) == null ? void 0 : _a.state) != null ? _b : void 0;
	const requestCounts = convertGoogleRequestCounts((_c = operation.metadata) == null ? void 0 : _c.batchStats);
	const createdAt = (_e = (_d = operation.metadata) == null ? void 0 : _d.createTime) != null ? _e : void 0;
	const error = operation.error != null ? convertGoogleRpcError(operation.error, "Google batch failed.") : void 0;
	return {
		status: mapGoogleBatchStatus({
			rawStatus,
			done: (_f = operation.done) != null ? _f : void 0,
			hasError: error != null
		}),
		...rawStatus != null ? { rawStatus } : {},
		...requestCounts != null ? { requestCounts } : {},
		...error != null ? { error } : {},
		...createdAt != null ? { createdAt } : {}
	};
}
function mapGoogleBatchStatus({ rawStatus, done, hasError }) {
	if (hasError) return "failed";
	if (rawStatus == null) return done ? "completed" : "pending";
	switch (rawStatus.replace(/^(?:BATCH|JOB)_STATE_/, "")) {
		case "SUCCEEDED": return "completed";
		case "FAILED":
		case "CANCELLED":
		case "EXPIRED": return "failed";
		default: return "pending";
	}
}
function convertGoogleRequestCounts(counts) {
	var _a, _b, _c;
	const total = parseCount(counts == null ? void 0 : counts.requestCount);
	const completed = parseCount((_a = counts == null ? void 0 : counts.successfulRequestCount) != null ? _a : 0);
	const failed = parseCount((_b = counts == null ? void 0 : counts.failedRequestCount) != null ? _b : 0);
	const pending = parseCount((_c = counts == null ? void 0 : counts.pendingRequestCount) != null ? _c : 0);
	return normalizeBatchRequestCounts({
		total,
		pending,
		completed,
		failed
	});
}
function parseCount(value) {
	const count = typeof value === "string" && /^\d+$/.test(value) ? Number(value) : value;
	return typeof count === "number" && Number.isSafeInteger(count) && count >= 0 ? count : void 0;
}
function convertGoogleRpcError(error, fallbackMessage) {
	var _a;
	return {
		message: (_a = error.message) != null ? _a : fallbackMessage,
		...error.status != null ? { type: error.status } : {},
		...error.code != null ? { code: String(error.code) } : {}
	};
}
var googleUploadUrlResponseHandler = async ({ response }) => {
	const uploadUrl = response.headers.get("x-goog-upload-url");
	if (uploadUrl == null) throw new InvalidResponseDataError({
		data: response.headers,
		message: "Google did not return a resumable upload URL."
	});
	return { value: uploadUrl };
};
var codeExecution = createProviderExecutedToolFactory({
	id: "google.code_execution",
	inputSchema: object({
		language: string().describe("The programming language of the code."),
		code: string().describe("The code to be executed.")
	}),
	outputSchema: object({
		outcome: string().describe("The outcome of the execution (e.g., \"OUTCOME_OK\")."),
		output: string().describe("The output from the code execution.")
	})
});
var enterpriseWebSearch = createProviderExecutedToolFactory({
	id: "google.enterprise_web_search",
	inputSchema: lazySchema(() => zodSchema(object({}))),
	outputSchema: lazySchema(() => zodSchema(object({})))
});
looseObject({
	/** The names of the file_search_stores to retrieve from.
	*  Example: `fileSearchStores/my-file-search-store-123`
	*/
	fileSearchStoreNames: array(string()).describe("The names of the file_search_stores to retrieve from. Example: `fileSearchStores/my-file-search-store-123`"),
	/** The number of file search retrieval chunks to retrieve. */
	topK: number().int().positive().describe("The number of file search retrieval chunks to retrieve.").optional(),
	/** Metadata filter to apply to the file search retrieval documents.
	*  See https://google.aip.dev/160 for the syntax of the filter expression.
	*/
	metadataFilter: string().describe("Metadata filter to apply to the file search retrieval documents. See https://google.aip.dev/160 for the syntax of the filter expression.").optional()
});
var fileSearch = createProviderExecutedToolFactory({
	id: "google.file_search",
	inputSchema: lazySchema(() => zodSchema(object({}))),
	outputSchema: lazySchema(() => zodSchema(object({})))
});
var googleMaps = createProviderExecutedToolFactory({
	id: "google.google_maps",
	inputSchema: lazySchema(() => zodSchema(object({}))),
	outputSchema: lazySchema(() => zodSchema(object({})))
});
var googleSearchToolArgsBaseSchema = looseObject({
	searchTypes: object({
		webSearch: object({}).optional(),
		imageSearch: object({}).optional()
	}).optional(),
	timeRangeFilter: object({
		startTime: string(),
		endTime: string()
	}).optional()
});
var googleTools = {
	/**
	* Creates a Google search tool that gives Google direct access to real-time web content.
	* Must have name "google_search".
	*/
	googleSearch: createProviderExecutedToolFactory({
		id: "google.google_search",
		inputSchema: lazySchema(() => zodSchema(object({}))),
		outputSchema: lazySchema(() => zodSchema(object({})))
	}),
	/**
	* Creates an Enterprise Web Search tool for grounding responses using a compliance-focused web index.
	* Designed for highly-regulated industries (finance, healthcare, public sector).
	* Does not log customer data and supports VPC service controls.
	* Must have name "enterprise_web_search".
	*
	* @note Only available on Vertex AI. Requires Gemini 2.0 or newer.
	*
	* @see https://cloud.google.com/vertex-ai/generative-ai/docs/grounding/web-grounding-enterprise
	*/
	enterpriseWebSearch,
	/**
	* Creates a Google Maps grounding tool that gives the model access to Google Maps data.
	* Must have name "google_maps".
	*
	* @see https://ai.google.dev/gemini-api/docs/maps-grounding
	* @see https://cloud.google.com/vertex-ai/generative-ai/docs/grounding/grounding-with-google-maps
	*/
	googleMaps,
	/**
	* Creates a URL context tool that gives Google direct access to real-time web content.
	* Must have name "url_context".
	*/
	urlContext: createProviderExecutedToolFactory({
		id: "google.url_context",
		inputSchema: lazySchema(() => zodSchema(object({}))),
		outputSchema: lazySchema(() => zodSchema(object({})))
	}),
	/**
	* Enables Retrieval Augmented Generation (RAG) via the Gemini File Search tool.
	* Must have name "file_search".
	*
	* @param fileSearchStoreNames - Fully-qualified File Search store resource names.
	* @param metadataFilter - Optional filter expression to restrict the files that can be retrieved.
	* @param topK - Optional result limit for the number of chunks returned from File Search.
	*
	* @see https://ai.google.dev/gemini-api/docs/file-search
	*/
	fileSearch,
	/**
	* A tool that enables the model to generate and run Python code.
	* Must have name "code_execution".
	*
	* @note Ensure the selected model supports Code Execution.
	* Multi-tool usage with the code execution tool is typically compatible with Gemini >=2 models.
	*
	* @see https://ai.google.dev/gemini-api/docs/code-execution (Google AI)
	* @see https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/code-execution-api (Vertex AI)
	*/
	codeExecution,
	/**
	* Creates a Vertex RAG Store tool that enables the model to perform RAG searches against a Vertex RAG Store.
	* Must have name "vertex_rag_store".
	*/
	vertexRagStore: createProviderExecutedToolFactory({
		id: "google.vertex_rag_store",
		inputSchema: lazySchema(() => zodSchema(object({}))),
		outputSchema: lazySchema(() => zodSchema(object({})))
	})
};
var googleImageModelOptionsSchema = lazySchema(() => zodSchema(object({ 
/**
* Enable Google Search grounding for Gemini image models. The value is
* forwarded as the args of the `google.tools.googleSearch` provider
* tool on the underlying language-model call. Pass `{}` for defaults.
*
* `generateImage` does not accept a `tools` parameter, so this is the
* dedicated escape hatch for grounding image generation the same way
* `generateText` does.
*/
googleSearch: googleSearchToolArgsBaseSchema.optional() })));
var GoogleImageModel = class _GoogleImageModel {
	constructor(modelId, settings, config) {
		this.modelId = modelId;
		this.settings = settings;
		this.config = config;
		this.specificationVersion = "v4";
	}
	static [WORKFLOW_SERIALIZE](model) {
		return serializeModelOptions({
			modelId: model.modelId,
			config: model.config
		});
	}
	static [WORKFLOW_DESERIALIZE](options) {
		return new _GoogleImageModel(options.modelId, {}, options.config);
	}
	get maxImagesPerCall() {
		if (this.settings.maxImagesPerCall != null) return this.settings.maxImagesPerCall;
		return 10;
	}
	get provider() {
		return this.config.provider;
	}
	async doGenerate(options) {
		var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
		if (!this.modelId.startsWith("gemini-")) throw new Error("Google image models other than Gemini are no longer supported. Use a model ID that starts with `gemini-`.");
		const { prompt, n, size, aspectRatio, seed, providerOptions, headers, abortSignal, files, mask } = options;
		const warnings = [];
		if (mask != null) throw new Error("Gemini image models do not support mask-based image editing.");
		if (n != null && n > 1) throw new Error("Gemini image models do not support generating a set number of images per call. Use n=1 or omit the n parameter.");
		if (size != null) warnings.push({
			type: "unsupported",
			feature: "size",
			details: "This model does not support the `size` option. Use `aspectRatio` instead."
		});
		const userContent = [];
		if (prompt != null) userContent.push({
			type: "text",
			text: prompt
		});
		if (files != null && files.length > 0) for (const file of files) if (file.type === "url") userContent.push({
			type: "file",
			data: {
				type: "url",
				url: new URL(file.url)
			},
			mediaType: "image/*"
		});
		else userContent.push({
			type: "file",
			data: {
				type: "data",
				data: typeof file.data === "string" ? file.data : new Uint8Array(file.data)
			},
			mediaType: file.mediaType
		});
		const languageModelPrompt = [{
			role: "user",
			content: userContent
		}];
		const googleImageOptions = await parseProviderOptions({
			provider: "google",
			providerOptions,
			schema: googleImageModelOptionsSchema
		});
		const { googleSearch: _strippedGoogleSearch, responseModalities: _strippedResponseModalities, imageConfig: userImageConfig, ...passthroughGoogleOptions } = (_a = providerOptions == null ? void 0 : providerOptions.google) != null ? _a : {};
		const result = await new GoogleLanguageModel(this.modelId, {
			provider: this.config.provider,
			baseURL: this.config.baseURL,
			headers: (_b = this.config.headers) != null ? _b : {},
			fetch: this.config.fetch,
			generateId: (_c = this.config.generateId) != null ? _c : generateId
		}).doGenerate({
			prompt: languageModelPrompt,
			seed,
			providerOptions: { google: {
				...passthroughGoogleOptions,
				responseModalities: ["IMAGE"],
				imageConfig: aspectRatio != null || userImageConfig != null ? {
					...userImageConfig,
					...aspectRatio != null ? { aspectRatio } : {}
				} : void 0
			} },
			tools: (googleImageOptions == null ? void 0 : googleImageOptions.googleSearch) != null ? [{
				type: "provider",
				id: "google.google_search",
				name: "google_search",
				args: googleImageOptions.googleSearch
			}] : void 0,
			headers,
			abortSignal
		});
		const currentDate = (_f = (_e = (_d = this.config._internal) == null ? void 0 : _d.currentDate) == null ? void 0 : _e.call(_d)) != null ? _f : /* @__PURE__ */ new Date();
		const images = [];
		for (const part of result.content) if (part.type === "file" && part.mediaType.startsWith("image/") && part.data.type === "data") images.push(convertToBase64(part.data.data));
		return {
			images,
			warnings,
			providerMetadata: { google: {
				...(_h = (_g = result.providerMetadata) == null ? void 0 : _g.google) != null ? _h : {},
				images: images.map(() => ({}))
			} },
			response: {
				timestamp: currentDate,
				modelId: this.modelId,
				headers: (_i = result.response) == null ? void 0 : _i.headers
			},
			usage: result.usage ? {
				inputTokens: result.usage.inputTokens.total,
				outputTokens: result.usage.outputTokens.total,
				totalTokens: ((_j = result.usage.inputTokens.total) != null ? _j : 0) + ((_k = result.usage.outputTokens.total) != null ? _k : 0)
			} : void 0
		};
	}
};
function encodePathSegment(value) {
	const encodedValue = encodeURIComponent(value);
	return encodedValue === "." ? "%252E" : encodedValue === ".." ? "%252E%252E" : encodedValue;
}
var GoogleFiles = class {
	constructor(config) {
		this.config = config;
		this.specificationVersion = "v4";
	}
	get provider() {
		return this.config.provider;
	}
	async uploadFile(options) {
		var _a, _b, _c, _d;
		const googleOptions = await parseProviderOptions({
			provider: "google",
			providerOptions: options.providerOptions,
			schema: googleFilesUploadOptionsSchema
		});
		const resolvedHeaders = this.config.headers();
		const fetchFn = (_a = this.config.fetch) != null ? _a : globalThis.fetch;
		const warnings = [];
		if (options.filename != null) warnings.push({
			type: "unsupported",
			feature: "filename"
		});
		const fileBytes = convertInlineFileDataToUint8Array(options.data);
		const mediaType = options.mediaType;
		const displayName = googleOptions == null ? void 0 : googleOptions.displayName;
		const initResponse = await fetchFn(`${this.config.baseURL.replace(/\/v1beta$/, "")}/upload/v1beta/files`, {
			method: "POST",
			headers: {
				...resolvedHeaders,
				"X-Goog-Upload-Protocol": "resumable",
				"X-Goog-Upload-Command": "start",
				"X-Goog-Upload-Header-Content-Length": String(fileBytes.length),
				"X-Goog-Upload-Header-Content-Type": mediaType,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ file: { ...displayName != null ? { display_name: displayName } : {} } })
		});
		if (!initResponse.ok) {
			const errorBody = await initResponse.text();
			throw new AISDKError({
				name: "GOOGLE_FILES_UPLOAD_ERROR",
				message: `Failed to initiate resumable upload: ${initResponse.status} ${errorBody}`
			});
		}
		const uploadUrl = initResponse.headers.get("x-goog-upload-url");
		if (!uploadUrl) throw new AISDKError({
			name: "GOOGLE_FILES_UPLOAD_ERROR",
			message: "No upload URL returned from initiation request"
		});
		const uploadResponse = await fetchFn(uploadUrl, {
			method: "POST",
			headers: {
				"X-Goog-Upload-Offset": "0",
				"X-Goog-Upload-Command": "upload, finalize"
			},
			body: ensureArrayBufferBacked(fileBytes)
		});
		if (!uploadResponse.ok) {
			const errorBody = await uploadResponse.text();
			throw new AISDKError({
				name: "GOOGLE_FILES_UPLOAD_ERROR",
				message: `Failed to upload file data: ${uploadResponse.status} ${errorBody}`
			});
		}
		let file = (await uploadResponse.json()).file;
		const pollIntervalMs = (_b = googleOptions == null ? void 0 : googleOptions.pollIntervalMs) != null ? _b : 2e3;
		const pollTimeoutMs = (_c = googleOptions == null ? void 0 : googleOptions.pollTimeoutMs) != null ? _c : 3e5;
		const startTime = Date.now();
		while (file.state === "PROCESSING") {
			if (Date.now() - startTime > pollTimeoutMs) throw new AISDKError({
				name: "GOOGLE_FILES_UPLOAD_TIMEOUT",
				message: `File processing timed out after ${pollTimeoutMs}ms`
			});
			await delay(pollIntervalMs);
			const fileNameMatch = /^files\/([^/]+)$/.exec(file.name);
			const filePath = fileNameMatch != null ? `files/${encodePathSegment(fileNameMatch[1])}` : encodePathSegment(file.name);
			const { value: fileStatus } = await getFromApi({
				url: `${this.config.baseURL}/${filePath}`,
				validateUrl: false,
				headers: combineHeaders(resolvedHeaders),
				successfulResponseHandler: createJsonResponseHandler(googleFileResponseSchema),
				failedResponseHandler: googleFailedResponseHandler,
				fetch: this.config.fetch
			});
			file = fileStatus;
		}
		if (file.state === "FAILED") throw new AISDKError({
			name: "GOOGLE_FILES_UPLOAD_FAILED",
			message: `File processing failed for ${file.name}`
		});
		return {
			warnings,
			providerReference: { google: file.uri },
			mediaType: (_d = file.mimeType) != null ? _d : options.mediaType,
			providerMetadata: { google: {
				name: file.name,
				displayName: file.displayName,
				mimeType: file.mimeType,
				sizeBytes: file.sizeBytes,
				state: file.state,
				uri: file.uri,
				...file.createTime != null ? { createTime: file.createTime } : {},
				...file.updateTime != null ? { updateTime: file.updateTime } : {},
				...file.expirationTime != null ? { expirationTime: file.expirationTime } : {},
				...file.sha256Hash != null ? { sha256Hash: file.sha256Hash } : {}
			} }
		};
	}
};
function ensureArrayBufferBacked(data) {
	if (data.buffer instanceof ArrayBuffer) return data;
	return new Uint8Array(data);
}
var googleFileResponseSchema = lazySchema(() => zodSchema(object({
	name: string(),
	displayName: string().nullish(),
	mimeType: string(),
	sizeBytes: string().nullish(),
	createTime: string().nullish(),
	updateTime: string().nullish(),
	expirationTime: string().nullish(),
	sha256Hash: string().nullish(),
	uri: string(),
	state: string()
})));
var googleFilesUploadOptionsSchema = lazySchema(() => zodSchema(looseObject({
	displayName: string().nullish(),
	pollIntervalMs: number().positive().nullish(),
	pollTimeoutMs: number().positive().nullish()
})));
var googleVideoModelOptionsSchema = lazySchema(() => zodSchema(looseObject({
	pollIntervalMs: number().positive().nullish(),
	pollTimeoutMs: number().positive().nullish(),
	personGeneration: _enum([
		"dont_allow",
		"allow_adult",
		"allow_all"
	]).nullish(),
	negativePrompt: string().nullish(),
	referenceImages: array(object({
		bytesBase64Encoded: string().nullish(),
		gcsUri: string().nullish()
	})).nullish()
})));
function getFirstFrameImage(options) {
	var _a, _b;
	return (_b = (_a = options.frameImages) == null ? void 0 : _a.find((frame) => frame.frameType === "first_frame")) == null ? void 0 : _b.image;
}
function resolveStartImage(options) {
	var _a;
	return (_a = getFirstFrameImage(options)) != null ? _a : options.image;
}
function getLastFrameImage(options) {
	var _a, _b;
	return (_b = (_a = options.frameImages) == null ? void 0 : _a.find((frame) => frame.frameType === "last_frame")) == null ? void 0 : _b.image;
}
function getInputReferences(options) {
	if (options.frameImages != null && options.frameImages.length > 0) return;
	return options.inputReferences != null && options.inputReferences.length > 0 ? options.inputReferences : void 0;
}
function convertFileToGoogleImage(file, warnings) {
	if (file.type === "url") {
		if (file.url.startsWith("gs://")) return {
			gcsUri: file.url,
			mimeType: "image/png"
		};
		warnings.push({
			type: "unsupported",
			feature: "URL-based image input",
			details: "Google Generative AI video models require base64-encoded images or GCS URIs. URL will be ignored."
		});
		return;
	}
	return {
		bytesBase64Encoded: typeof file.data === "string" ? file.data : convertUint8ArrayToBase64(file.data),
		mimeType: file.mediaType || "image/png"
	};
}
function convertProviderReferenceImage(refImg) {
	if (refImg.bytesBase64Encoded) return {
		image: {
			bytesBase64Encoded: refImg.bytesBase64Encoded,
			mimeType: "image/png"
		},
		referenceType: "asset"
	};
	if (refImg.gcsUri) return {
		image: {
			gcsUri: refImg.gcsUri,
			mimeType: "image/png"
		},
		referenceType: "asset"
	};
	return refImg;
}
function convertInputReferenceImage(file, warnings) {
	const image = convertFileToGoogleImage(file, warnings);
	return image != null ? {
		image,
		referenceType: "asset"
	} : void 0;
}
var GoogleVideoModel = class {
	constructor(modelId, config) {
		this.modelId = modelId;
		this.config = config;
		this.specificationVersion = "v4";
	}
	get provider() {
		return this.config.provider;
	}
	get maxVideosPerCall() {
		return 4;
	}
	async buildRequest(options) {
		const warnings = [];
		const googleOptions = await parseProviderOptions({
			provider: "google",
			providerOptions: options.providerOptions,
			schema: googleVideoModelOptionsSchema
		});
		const instances = [{}];
		const instance = instances[0];
		if (options.prompt != null) instance.prompt = options.prompt;
		const startImage = resolveStartImage(options);
		if (startImage != null) {
			const image = convertFileToGoogleImage(startImage, warnings);
			if (image != null) instance.image = image;
		}
		const lastFrameImage = getLastFrameImage(options);
		if (lastFrameImage != null) {
			const lastFrame = convertFileToGoogleImage(lastFrameImage, warnings);
			if (lastFrame != null) instance.lastFrame = lastFrame;
		}
		const inputReferences = getInputReferences(options);
		if (inputReferences != null) instance.referenceImages = inputReferences.flatMap((reference) => {
			const converted = convertInputReferenceImage(reference, warnings);
			return converted != null ? [converted] : [];
		});
		else if ((googleOptions == null ? void 0 : googleOptions.referenceImages) != null) instance.referenceImages = googleOptions.referenceImages.map((refImg) => convertProviderReferenceImage(refImg));
		const parameters = { sampleCount: options.n };
		if (options.aspectRatio) parameters.aspectRatio = options.aspectRatio;
		if (options.resolution) parameters.resolution = {
			"1280x720": "720p",
			"1920x1080": "1080p",
			"3840x2160": "4k"
		}[options.resolution] || options.resolution;
		if (options.duration) parameters.durationSeconds = options.duration;
		if (options.seed) parameters.seed = options.seed;
		if (googleOptions != null) {
			const opts = googleOptions;
			if (opts.personGeneration !== void 0 && opts.personGeneration !== null) parameters.personGeneration = opts.personGeneration;
			if (opts.negativePrompt !== void 0 && opts.negativePrompt !== null) parameters.negativePrompt = opts.negativePrompt;
			for (const [key, value] of Object.entries(opts)) if (![
				"pollIntervalMs",
				"pollTimeoutMs",
				"personGeneration",
				"negativePrompt",
				"referenceImages"
			].includes(key)) parameters[key] = value;
		}
		return {
			instances,
			parameters,
			warnings,
			googleOptions
		};
	}
	async buildCompletedResult(finalOperation, responseHeaders, warnings, currentDate) {
		var _a, _b;
		const response = finalOperation.response;
		if (!((_a = response == null ? void 0 : response.generateVideoResponse) == null ? void 0 : _a.generatedSamples) || response.generateVideoResponse.generatedSamples.length === 0) throw new AISDKError({
			name: "GOOGLE_VIDEO_GENERATION_ERROR",
			message: `No videos in response. Response: ${JSON.stringify(finalOperation)}`
		});
		const videos = [];
		const videoMetadata = [];
		const resolvedHeaders = await resolve(this.config.headers);
		const apiKey = resolvedHeaders == null ? void 0 : resolvedHeaders["x-goog-api-key"];
		for (const generatedSample of response.generateVideoResponse.generatedSamples) if ((_b = generatedSample.video) == null ? void 0 : _b.uri) {
			const urlWithAuth = apiKey && isSameOrigin(generatedSample.video.uri, this.config.baseURL) ? `${generatedSample.video.uri}${generatedSample.video.uri.includes("?") ? "&" : "?"}key=${apiKey}` : generatedSample.video.uri;
			videos.push({
				type: "url",
				url: urlWithAuth,
				mediaType: "video/mp4"
			});
			videoMetadata.push({ uri: generatedSample.video.uri });
		}
		if (videos.length === 0) throw new AISDKError({
			name: "GOOGLE_VIDEO_GENERATION_ERROR",
			message: "No valid videos in response"
		});
		return {
			status: "completed",
			videos,
			warnings,
			response: {
				timestamp: currentDate,
				modelId: this.modelId,
				headers: responseHeaders
			},
			providerMetadata: { google: { videos: videoMetadata } }
		};
	}
	async doStart(options) {
		var _a, _b, _c;
		const currentDate = (_c = (_b = (_a = this.config._internal) == null ? void 0 : _a.currentDate) == null ? void 0 : _b.call(_a)) != null ? _c : /* @__PURE__ */ new Date();
		const { instances, parameters, warnings } = await this.buildRequest(options);
		const { value: operation, responseHeaders } = await postJsonToApi({
			url: `${this.config.baseURL}/models/${this.modelId}:predictLongRunning`,
			headers: combineHeaders(await resolve(this.config.headers), options.headers),
			body: {
				instances,
				parameters
			},
			successfulResponseHandler: createJsonResponseHandler(googleOperationSchema),
			failedResponseHandler: googleFailedResponseHandler,
			abortSignal: options.abortSignal,
			fetch: this.config.fetch
		});
		const operationName = operation.name;
		if (!operationName) throw new AISDKError({
			name: "GOOGLE_VIDEO_GENERATION_ERROR",
			message: "No operation name returned from API"
		});
		return {
			operation: { operationName },
			warnings,
			response: {
				timestamp: currentDate,
				modelId: this.modelId,
				headers: responseHeaders
			}
		};
	}
	async doStatus(options) {
		var _a, _b, _c;
		const currentDate = (_c = (_b = (_a = this.config._internal) == null ? void 0 : _a.currentDate) == null ? void 0 : _b.call(_a)) != null ? _c : /* @__PURE__ */ new Date();
		const { operationName } = options.operation;
		const { value: statusOperation, responseHeaders } = await getFromApi({
			url: `${this.config.baseURL}/${operationName}`,
			validateUrl: false,
			headers: combineHeaders(await resolve(this.config.headers), options.headers),
			successfulResponseHandler: createJsonResponseHandler(googleOperationSchema),
			failedResponseHandler: googleFailedResponseHandler,
			abortSignal: options.abortSignal,
			fetch: this.config.fetch
		});
		if (!statusOperation.done) return {
			status: "pending",
			response: {
				timestamp: currentDate,
				modelId: this.modelId,
				headers: responseHeaders
			}
		};
		if (statusOperation.error) return {
			status: "error",
			error: `Video generation failed: ${statusOperation.error.message}`,
			response: {
				timestamp: currentDate,
				modelId: this.modelId,
				headers: responseHeaders
			}
		};
		return this.buildCompletedResult(statusOperation, responseHeaders, [], currentDate);
	}
};
var googleOperationSchema = object({
	name: string().nullish(),
	done: boolean().nullish(),
	error: object({
		code: number().nullish(),
		message: string(),
		status: string().nullish()
	}).nullish(),
	response: object({ generateVideoResponse: object({ generatedSamples: array(object({ video: object({ uri: string().nullish() }).nullish() })).nullish() }).nullish() }).nullish()
});
var googleSpeechResponseSchema = lazySchema(() => zodSchema(object({ candidates: array(object({ content: object({ parts: array(object({ inlineData: object({
	mimeType: string().nullish(),
	data: string().nullish()
}).nullish() })).nullish() }).nullish() })).nullish() })));
var prebuiltVoiceConfigSchema = object({ voiceName: string() });
var voiceConfigSchema = object({ prebuiltVoiceConfig: prebuiltVoiceConfigSchema });
var googleSpeechProviderOptionsSchema = lazySchema(() => zodSchema(object({ 
/**
* Multi-speaker configuration for dialogue audio. When provided, this
* overrides the top-level `voice`. The Gemini TTS API supports up to two
* speakers; each speaker name must match a name used in the input text.
*
* https://ai.google.dev/gemini-api/docs/speech-generation#multi-speaker
*/
multiSpeakerVoiceConfig: object({ speakerVoiceConfigs: array(object({
	speaker: string(),
	voiceConfig: voiceConfigSchema
})) }).optional() })));
var DEFAULT_VOICE = "Kore";
var DEFAULT_SAMPLE_RATE = 24e3;
var GoogleSpeechModel = class _GoogleSpeechModel {
	constructor(modelId, config) {
		this.modelId = modelId;
		this.config = config;
		this.specificationVersion = "v4";
	}
	static [WORKFLOW_SERIALIZE](model) {
		return serializeModelOptions({
			modelId: model.modelId,
			config: model.config
		});
	}
	static [WORKFLOW_DESERIALIZE](options) {
		return new _GoogleSpeechModel(options.modelId, options.config);
	}
	get provider() {
		return this.config.provider;
	}
	async getArgs({ text, voice = DEFAULT_VOICE, outputFormat, instructions, speed, language, providerOptions }) {
		const warnings = [];
		const providerOptionsNames = this.config.provider.includes("vertex") ? ["googleVertex", "vertex"] : ["google"];
		let googleOptions;
		for (const name of providerOptionsNames) {
			googleOptions = await parseProviderOptions({
				provider: name,
				providerOptions,
				schema: googleSpeechProviderOptionsSchema
			});
			if (googleOptions != null) break;
		}
		if (googleOptions == null && !providerOptionsNames.includes("google")) googleOptions = await parseProviderOptions({
			provider: "google",
			providerOptions,
			schema: googleSpeechProviderOptionsSchema
		});
		const multiSpeakerVoiceConfig = googleOptions == null ? void 0 : googleOptions.multiSpeakerVoiceConfig;
		const speechConfig = multiSpeakerVoiceConfig ? { multiSpeakerVoiceConfig } : { voiceConfig: { prebuiltVoiceConfig: { voiceName: voice } } };
		let promptText = text;
		if (instructions != null) if (multiSpeakerVoiceConfig) warnings.push({
			type: "unsupported",
			feature: "instructions",
			details: "Google Gemini TTS ignores `instructions` when `multiSpeakerVoiceConfig` is set, because prepending them would break multi-speaker transcript parsing."
		});
		else promptText = `${instructions}: ${text}`;
		if (speed != null) warnings.push({
			type: "unsupported",
			feature: "speed",
			details: "Google Gemini TTS models do not support the `speed` option. It was ignored."
		});
		if (language != null) warnings.push({
			type: "unsupported",
			feature: "language",
			details: "Google Gemini TTS models do not support the `language` option. Language is detected automatically from the input text."
		});
		let resolvedOutputFormat = "wav";
		if (outputFormat === "pcm") resolvedOutputFormat = "pcm";
		else if (outputFormat != null && outputFormat !== "wav") warnings.push({
			type: "unsupported",
			feature: "outputFormat",
			details: `Unsupported output format: ${outputFormat}. Using wav instead.`
		});
		return {
			requestBody: {
				contents: [{
					role: "user",
					parts: [{ text: promptText }]
				}],
				generationConfig: {
					responseModalities: ["AUDIO"],
					speechConfig
				}
			},
			warnings,
			outputFormat: resolvedOutputFormat
		};
	}
	async doGenerate(options) {
		var _a, _b, _c, _d, _e, _f, _g, _h, _i;
		const currentDate = (_c = (_b = (_a = this.config._internal) == null ? void 0 : _a.currentDate) == null ? void 0 : _b.call(_a)) != null ? _c : /* @__PURE__ */ new Date();
		const { requestBody, warnings, outputFormat } = await this.getArgs(options);
		const { value: response, responseHeaders, rawValue: rawResponse } = await postJsonToApi({
			url: `${this.config.baseURL}/models/${this.modelId}:generateContent`,
			headers: combineHeaders(this.config.headers ? await resolve(this.config.headers) : void 0, options.headers),
			body: requestBody,
			failedResponseHandler: googleFailedResponseHandler,
			successfulResponseHandler: createJsonResponseHandler(googleSpeechResponseSchema),
			abortSignal: options.abortSignal,
			fetch: this.config.fetch
		});
		let base64Audio;
		let mimeType;
		for (const candidate of (_d = response.candidates) != null ? _d : []) {
			for (const part of (_f = (_e = candidate.content) == null ? void 0 : _e.parts) != null ? _f : []) if ((_g = part.inlineData) == null ? void 0 : _g.data) {
				base64Audio = part.inlineData.data;
				mimeType = (_h = part.inlineData.mimeType) != null ? _h : void 0;
				break;
			}
			if (base64Audio != null) break;
		}
		const sampleRate = (_i = parseSampleRate(mimeType)) != null ? _i : DEFAULT_SAMPLE_RATE;
		const pcm = base64Audio != null ? convertBase64ToUint8Array(base64Audio) : /* @__PURE__ */ new Uint8Array(0);
		const audio = outputFormat === "pcm" || pcm.length === 0 ? pcm : addWavHeader(pcm, sampleRate);
		if (outputFormat === "pcm" && pcm.length > 0) warnings.push({
			type: "unsupported",
			feature: "outputFormat",
			details: `Returning raw PCM audio (signed 16-bit little-endian, mono, ${sampleRate} Hz). These bytes have no container header and are not directly playable; see providerMetadata.google for the sample rate and mime type.`
		});
		return {
			audio,
			warnings,
			request: { body: JSON.stringify(requestBody) },
			response: {
				timestamp: currentDate,
				modelId: this.modelId,
				headers: responseHeaders,
				body: rawResponse
			},
			providerMetadata: { google: {
				sampleRate,
				mimeType: mimeType != null ? mimeType : null
			} }
		};
	}
};
function parseSampleRate(mimeType) {
	if (mimeType == null) return;
	const match = /rate=(\d+)/.exec(mimeType);
	return match ? Number.parseInt(match[1], 10) : void 0;
}
function addWavHeader(pcm, sampleRate) {
	const numChannels = 1;
	const bitsPerSample = 16;
	const blockAlign = 16 / 8;
	const byteRate = sampleRate * blockAlign;
	const dataSize = pcm.length;
	const buffer = new ArrayBuffer(44 + dataSize);
	const view = new DataView(buffer);
	writeAscii(view, 0, "RIFF");
	view.setUint32(4, 36 + dataSize, true);
	writeAscii(view, 8, "WAVE");
	writeAscii(view, 12, "fmt ");
	view.setUint32(16, 16, true);
	view.setUint16(20, 1, true);
	view.setUint16(22, numChannels, true);
	view.setUint32(24, sampleRate, true);
	view.setUint32(28, byteRate, true);
	view.setUint16(32, blockAlign, true);
	view.setUint16(34, bitsPerSample, true);
	writeAscii(view, 36, "data");
	view.setUint32(40, dataSize, true);
	const out = new Uint8Array(buffer);
	out.set(pcm, 44);
	return out;
}
function writeAscii(view, offset, text) {
	for (let i = 0; i < text.length; i++) view.setUint8(offset + i, text.charCodeAt(i));
}
function convertGoogleInteractionsUsage(usage) {
	var _a, _b, _c, _d, _e, _f, _g, _h;
	if (usage == null) return createNullLanguageModelUsage();
	const totalInput = (_a = usage.total_input_tokens) != null ? _a : 0;
	const totalOutput = (_b = usage.total_output_tokens) != null ? _b : 0;
	const totalThought = (_c = usage.total_thought_tokens) != null ? _c : 0;
	const totalCached = (_d = usage.total_cached_tokens) != null ? _d : 0;
	return {
		inputTokens: {
			total: (_e = usage.total_input_tokens) != null ? _e : void 0,
			noCache: usage.total_input_tokens == null ? void 0 : totalInput - totalCached,
			cacheRead: (_f = usage.total_cached_tokens) != null ? _f : void 0,
			cacheWrite: void 0
		},
		outputTokens: {
			total: usage.total_output_tokens == null && usage.total_thought_tokens == null ? void 0 : totalOutput + totalThought,
			text: (_g = usage.total_output_tokens) != null ? _g : void 0,
			reasoning: (_h = usage.total_thought_tokens) != null ? _h : void 0
		},
		raw: usage
	};
}
function getGoogleInteractionsOutputTokensByModality(usage) {
	const byModality = usage == null ? void 0 : usage.output_tokens_by_modality;
	if (byModality == null) return;
	const result = {};
	for (const entry of byModality) if ((entry == null ? void 0 : entry.modality) != null && entry.tokens != null) result[entry.modality] = entry.tokens;
	return Object.keys(result).length > 0 ? result : void 0;
}
var KNOWN_DOC_EXTENSIONS = {
	pdf: "application/pdf",
	txt: "text/plain",
	md: "text/markdown",
	markdown: "text/markdown",
	doc: "application/msword",
	docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
};
function inferDocMediaType(uriOrName) {
	const lower = uriOrName.toLowerCase();
	for (const [ext, media] of Object.entries(KNOWN_DOC_EXTENSIONS)) if (lower.endsWith(`.${ext}`)) return media;
	return "application/octet-stream";
}
function basename(uriOrName) {
	const parts = uriOrName.split("/");
	const last = parts[parts.length - 1];
	return last && last.length > 0 ? last : void 0;
}
function annotationToSource({ annotation, generateId: generateId4 }) {
	var _a, _b, _c, _d, _e;
	switch (annotation.type) {
		case "url_citation": {
			const urlCitation = annotation;
			if (urlCitation.url == null || urlCitation.url.length === 0) return;
			return {
				type: "source",
				sourceType: "url",
				id: generateId4(),
				url: urlCitation.url,
				...urlCitation.title != null ? { title: urlCitation.title } : {}
			};
		}
		case "file_citation": {
			const fileCitation = annotation;
			const uri = (_b = (_a = fileCitation.url) != null ? _a : fileCitation.document_uri) != null ? _b : fileCitation.file_name;
			if (uri == null || uri.length === 0) return void 0;
			if (uri.startsWith("http://") || uri.startsWith("https://")) return {
				type: "source",
				sourceType: "url",
				id: generateId4(),
				url: uri,
				...fileCitation.file_name != null ? { title: fileCitation.file_name } : {}
			};
			const filename = (_c = fileCitation.file_name) != null ? _c : basename(uri);
			const mediaType = inferDocMediaType(uri);
			return {
				type: "source",
				sourceType: "document",
				id: generateId4(),
				mediaType,
				title: (_e = (_d = fileCitation.file_name) != null ? _d : filename) != null ? _e : uri,
				...filename != null ? { filename } : {}
			};
		}
		case "place_citation": {
			const placeCitation = annotation;
			if (placeCitation.url == null || placeCitation.url.length === 0) return;
			return {
				type: "source",
				sourceType: "url",
				id: generateId4(),
				url: placeCitation.url,
				...placeCitation.name != null ? { title: placeCitation.name } : {}
			};
		}
		default: return;
	}
}
function builtinToolResultToSources({ block, generateId: generateId4 }) {
	var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
	const sources = [];
	switch (block.type) {
		case "url_context_result": {
			const result = (_a = block.result) != null ? _a : [];
			for (const entry of result) {
				if ((entry == null ? void 0 : entry.url) == null || entry.url.length === 0) continue;
				if (entry.status != null && entry.status !== "success") continue;
				sources.push({
					type: "source",
					sourceType: "url",
					id: generateId4(),
					url: entry.url
				});
			}
			break;
		}
		case "google_search_result": {
			const result = (_b = block.result) != null ? _b : [];
			for (const entry of result) {
				const url = entry == null ? void 0 : entry.url;
				if (url == null || url.length === 0) continue;
				sources.push({
					type: "source",
					sourceType: "url",
					id: generateId4(),
					url,
					...entry.title != null ? { title: entry.title } : {}
				});
			}
			break;
		}
		case "google_maps_result": {
			const result = (_c = block.result) != null ? _c : [];
			for (const entry of result) for (const place of (_d = entry.places) != null ? _d : []) {
				if (place.url == null || place.url.length === 0) continue;
				sources.push({
					type: "source",
					sourceType: "url",
					id: generateId4(),
					url: place.url,
					...place.name != null ? { title: place.name } : {}
				});
			}
			break;
		}
		case "file_search_result": {
			const result = (_e = block.result) != null ? _e : [];
			for (const raw of result) {
				if (raw == null || typeof raw !== "object") continue;
				const entry = raw;
				const uri = (_g = (_f = entry.url) != null ? _f : entry.document_uri) != null ? _g : entry.file_name;
				if (uri == null || uri.length === 0) continue;
				if (uri.startsWith("http://") || uri.startsWith("https://")) {
					sources.push({
						type: "source",
						sourceType: "url",
						id: generateId4(),
						url: uri,
						...entry.title != null ? { title: entry.title } : {}
					});
					continue;
				}
				const filename = (_h = entry.file_name) != null ? _h : basename(uri);
				const mediaType = inferDocMediaType(uri);
				sources.push({
					type: "source",
					sourceType: "document",
					id: generateId4(),
					mediaType,
					title: (_k = (_j = (_i = entry.title) != null ? _i : entry.file_name) != null ? _j : filename) != null ? _k : uri,
					...filename != null ? { filename } : {}
				});
			}
			break;
		}
	}
	return sources;
}
function annotationsToSources({ annotations, generateId: generateId4 }) {
	var _a;
	if (annotations == null) return [];
	const seen = /* @__PURE__ */ new Set();
	const sources = [];
	for (const annotation of annotations) {
		const source = annotationToSource({
			annotation,
			generateId: generateId4
		});
		if (source == null) continue;
		const key = source.sourceType === "url" ? `url:${source.url}` : `doc:${(_a = source.filename) != null ? _a : source.title}`;
		if (seen.has(key)) continue;
		seen.add(key);
		sources.push(source);
	}
	return sources;
}
function mapGoogleInteractionsFinishReason({ status, hasFunctionCall }) {
	switch (status) {
		case "completed": return hasFunctionCall ? "tool-calls" : "stop";
		case "requires_action": return "tool-calls";
		case "failed": return "error";
		case "incomplete": return "length";
		case "cancelled": return "other";
		default: return "other";
	}
}
var BUILTIN_TOOL_CALL_TYPES = /* @__PURE__ */ new Set([
	"google_search_call",
	"code_execution_call",
	"url_context_call",
	"file_search_call",
	"google_maps_call",
	"mcp_server_tool_call"
]);
var BUILTIN_TOOL_RESULT_TYPES = /* @__PURE__ */ new Set([
	"google_search_result",
	"code_execution_result",
	"url_context_result",
	"file_search_result",
	"google_maps_result",
	"mcp_server_tool_result"
]);
function builtinToolNameFromCallType(type) {
	return type.replace(/_call$/, "");
}
function builtinToolNameFromResultType(type) {
	return type.replace(/_result$/, "");
}
function buildGoogleInteractionsStreamTransform({ warnings, generateId: generateId4, includeRawChunks, serviceTier: headerServiceTier }) {
	let interactionId;
	let usage;
	let serviceTier = headerServiceTier;
	let finishStatus;
	let hasFunctionCall = false;
	const openBlocks = /* @__PURE__ */ new Map();
	const emittedSourceKeys = /* @__PURE__ */ new Set();
	function sourceKey(source) {
		var _a;
		return source.sourceType === "url" ? `url:${source.url}` : `doc:${(_a = source.filename) != null ? _a : source.title}`;
	}
	return new TransformStream({
		start(controller) {
			controller.enqueue({
				type: "stream-start",
				warnings
			});
		},
		transform(chunk, controller) {
			var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t;
			if (includeRawChunks) controller.enqueue({
				type: "raw",
				rawValue: chunk.rawValue
			});
			if (!chunk.success) {
				finishStatus = "failed";
				controller.enqueue({
					type: "error",
					error: chunk.error
				});
				return;
			}
			const value = chunk.value;
			const eventType = value.event_type;
			switch (eventType) {
				case "interaction.created": {
					const interaction = value.interaction;
					interactionId = (interaction == null ? void 0 : interaction.id) != null && interaction.id.length > 0 ? interaction.id : void 0;
					const created = interaction == null ? void 0 : interaction.created;
					let timestamp;
					if (typeof created === "string") {
						const parsed = new Date(created);
						if (!Number.isNaN(parsed.getTime())) timestamp = parsed;
					}
					controller.enqueue({
						type: "response-metadata",
						...interactionId != null ? { id: interactionId } : {},
						modelId: interaction == null ? void 0 : interaction.model,
						...timestamp ? { timestamp } : {}
					});
					break;
				}
				case "step.start": {
					const event = value;
					const step = event.step;
					const index = event.index;
					const blockId = `${interactionId != null ? interactionId : "interaction"}:${index}`;
					const stepType = step == null ? void 0 : step.type;
					if (stepType === "model_output") {
						const initial = (_a = step == null ? void 0 : step.content) == null ? void 0 : _a[0];
						if ((initial == null ? void 0 : initial.type) === "text") {
							openBlocks.set(index, {
								kind: "text",
								id: blockId,
								emittedSourceKeys: /* @__PURE__ */ new Set()
							});
							controller.enqueue({
								type: "text-start",
								id: blockId
							});
							const initialSources = annotationsToSources({
								annotations: initial.annotations,
								generateId: generateId4
							});
							for (const source of initialSources) {
								const key = sourceKey(source);
								if (emittedSourceKeys.has(key)) continue;
								emittedSourceKeys.add(key);
								controller.enqueue(source);
							}
						} else if ((initial == null ? void 0 : initial.type) === "image") openBlocks.set(index, {
							kind: "image",
							id: blockId,
							...initial.data != null ? { data: initial.data } : {},
							...initial.mime_type != null ? { mimeType: initial.mime_type } : {},
							...initial.uri != null ? { uri: initial.uri } : {}
						});
						else openBlocks.set(index, {
							kind: "pending_model_output",
							id: blockId
						});
					} else if (stepType === "thought") {
						const signature = step == null ? void 0 : step.signature;
						openBlocks.set(index, {
							kind: "reasoning",
							id: blockId,
							...signature != null ? { signature } : {}
						});
						controller.enqueue({
							type: "reasoning-start",
							id: blockId
						});
						if (Array.isArray(step == null ? void 0 : step.summary)) {
							for (const item of step.summary) if ((item == null ? void 0 : item.type) === "text" && typeof item.text === "string") controller.enqueue({
								type: "reasoning-delta",
								id: blockId,
								delta: item.text
							});
						}
					} else if (stepType === "function_call") {
						const toolCallId = (step == null ? void 0 : step.id) || blockId;
						const toolName = (_b = step == null ? void 0 : step.name) != null ? _b : "unknown";
						hasFunctionCall = true;
						const state = {
							kind: "function_call",
							id: blockId,
							toolCallId,
							toolName,
							argumentsAccum: "",
							...(step == null ? void 0 : step.signature) != null ? { signature: step.signature } : {}
						};
						openBlocks.set(index, state);
						controller.enqueue({
							type: "tool-input-start",
							id: toolCallId,
							toolName
						});
					} else if (stepType != null && BUILTIN_TOOL_CALL_TYPES.has(stepType)) {
						const toolName = stepType === "mcp_server_tool_call" ? (_c = step == null ? void 0 : step.name) != null ? _c : "mcp_server_tool" : builtinToolNameFromCallType(stepType);
						const state = {
							kind: "builtin_tool_call",
							id: blockId,
							blockType: stepType,
							toolCallId: (step == null ? void 0 : step.id) || blockId,
							toolName,
							arguments: (_d = step == null ? void 0 : step.arguments) != null ? _d : {},
							callEmitted: false
						};
						openBlocks.set(index, state);
					} else if (stepType != null && BUILTIN_TOOL_RESULT_TYPES.has(stepType)) {
						const toolName = stepType === "mcp_server_tool_result" ? (_e = step == null ? void 0 : step.name) != null ? _e : "mcp_server_tool" : builtinToolNameFromResultType(stepType);
						const state = {
							kind: "builtin_tool_result",
							id: blockId,
							blockType: stepType,
							callId: (step == null ? void 0 : step.call_id) || blockId,
							toolName,
							result: (_f = step == null ? void 0 : step.result) != null ? _f : null,
							...(step == null ? void 0 : step.is_error) != null ? { isError: step.is_error } : {},
							resultEmitted: false
						};
						openBlocks.set(index, state);
					} else openBlocks.set(index, {
						kind: "unknown",
						id: blockId
					});
					break;
				}
				case "step.delta": {
					const event = value;
					let open = openBlocks.get(event.index);
					if (open == null) break;
					const dtype = (_g = event.delta) == null ? void 0 : _g.type;
					if (open.kind === "pending_model_output") {
						if (dtype === "text" || dtype === "text_annotation" || dtype === "text_annotation_delta") {
							const promoted = {
								kind: "text",
								id: open.id,
								emittedSourceKeys: /* @__PURE__ */ new Set()
							};
							openBlocks.set(event.index, promoted);
							open = promoted;
							controller.enqueue({
								type: "text-start",
								id: promoted.id
							});
						}
					}
					if (dtype === "image" && (open.kind === "pending_model_output" || open.kind === "text" || open.kind === "image")) {
						const imageDelta = event.delta;
						const google2 = {};
						if (interactionId != null) google2.interactionId = interactionId;
						const providerMetadata = Object.keys(google2).length > 0 ? { google: google2 } : void 0;
						if ((imageDelta == null ? void 0 : imageDelta.data) != null && imageDelta.data.length > 0) controller.enqueue({
							type: "file",
							mediaType: (_h = imageDelta.mime_type) != null ? _h : "image/png",
							data: {
								type: "data",
								data: imageDelta.data
							},
							...providerMetadata ? { providerMetadata } : {}
						});
						else if ((imageDelta == null ? void 0 : imageDelta.uri) != null && imageDelta.uri.length > 0) controller.enqueue({
							type: "file",
							mediaType: (_i = imageDelta.mime_type) != null ? _i : "image/png",
							data: {
								type: "url",
								url: new URL(imageDelta.uri)
							},
							...providerMetadata ? { providerMetadata } : {}
						});
						if (open.kind === "image") {
							open.data = void 0;
							open.uri = void 0;
						}
						break;
					}
					if (dtype === "video" && (open.kind === "pending_model_output" || open.kind === "text")) {
						const videoDelta = event.delta;
						const google2 = {};
						if (interactionId != null) google2.interactionId = interactionId;
						const providerMetadata = Object.keys(google2).length > 0 ? { google: google2 } : void 0;
						if ((videoDelta == null ? void 0 : videoDelta.data) != null && videoDelta.data.length > 0) controller.enqueue({
							type: "file",
							mediaType: (_j = videoDelta.mime_type) != null ? _j : "video/mp4",
							data: {
								type: "data",
								data: videoDelta.data
							},
							...providerMetadata ? { providerMetadata } : {}
						});
						else if ((videoDelta == null ? void 0 : videoDelta.uri) != null && videoDelta.uri.length > 0) controller.enqueue({
							type: "file",
							mediaType: (_k = videoDelta.mime_type) != null ? _k : "video/mp4",
							data: {
								type: "url",
								url: new URL(videoDelta.uri)
							},
							...providerMetadata ? { providerMetadata } : {}
						});
						break;
					}
					const delta = event.delta;
					if (open.kind === "text" && (delta == null ? void 0 : delta.type) === "text") {
						const text = (_l = delta.text) != null ? _l : "";
						if (text.length > 0) controller.enqueue({
							type: "text-delta",
							id: open.id,
							delta: text
						});
					} else if (open.kind === "text" && ((delta == null ? void 0 : delta.type) === "text_annotation" || (delta == null ? void 0 : delta.type) === "text_annotation_delta")) {
						const sources = annotationsToSources({
							annotations: delta.annotations,
							generateId: generateId4
						});
						for (const source of sources) {
							const key = sourceKey(source);
							if (emittedSourceKeys.has(key)) continue;
							emittedSourceKeys.add(key);
							open.emittedSourceKeys.add(key);
							controller.enqueue(source);
						}
					} else if (open.kind === "image" && (delta == null ? void 0 : delta.type) === "image") {
						if (delta.data != null) open.data = delta.data;
						if (delta.mime_type != null) open.mimeType = delta.mime_type;
						if (delta.uri != null) open.uri = delta.uri;
					} else if (open.kind === "reasoning") {
						if ((delta == null ? void 0 : delta.type) === "thought_summary") {
							const item = delta.content;
							if ((item == null ? void 0 : item.type) === "text" && typeof item.text === "string") controller.enqueue({
								type: "reasoning-delta",
								id: open.id,
								delta: item.text
							});
						} else if ((delta == null ? void 0 : delta.type) === "thought_signature") {
							const signature = delta.signature;
							if (signature != null) open.signature = signature;
						}
					} else if (open.kind === "function_call" && (delta == null ? void 0 : delta.type) === "arguments_delta") {
						const slice = typeof delta.arguments === "string" ? delta.arguments : "";
						if (slice.length > 0) {
							open.argumentsAccum += slice;
							controller.enqueue({
								type: "tool-input-delta",
								id: open.toolCallId,
								delta: slice
							});
						}
						if (delta.id != null && delta.id.length > 0) open.toolCallId = delta.id;
						if (delta.signature != null) open.signature = delta.signature;
						hasFunctionCall = true;
					} else if (open.kind === "builtin_tool_call" && (delta == null ? void 0 : delta.type) === open.blockType) {
						if (delta.id != null && delta.id.length > 0) open.toolCallId = delta.id;
						if (delta.arguments != null && typeof delta.arguments === "object") open.arguments = delta.arguments;
						if (delta.name != null && open.blockType === "mcp_server_tool_call") open.toolName = delta.name;
					} else if (open.kind === "builtin_tool_result" && (delta == null ? void 0 : delta.type) === open.blockType) {
						if (delta.call_id != null && delta.call_id.length > 0) open.callId = delta.call_id;
						if (delta.result !== void 0) open.result = delta.result;
						if (delta.is_error != null) open.isError = delta.is_error;
						if (delta.name != null && open.blockType === "mcp_server_tool_result") open.toolName = delta.name;
					}
					break;
				}
				case "step.stop": {
					const event = value;
					const open = openBlocks.get(event.index);
					if (open == null) break;
					if (open.kind === "text") {
						const textProviderMetadata = interactionId != null ? { google: { interactionId } } : void 0;
						controller.enqueue({
							type: "text-end",
							id: open.id,
							...textProviderMetadata ? { providerMetadata: textProviderMetadata } : {}
						});
					} else if (open.kind === "reasoning") {
						const google2 = {};
						if (open.signature != null) google2.signature = open.signature;
						if (interactionId != null) google2.interactionId = interactionId;
						const providerMetadata = Object.keys(google2).length > 0 ? { google: google2 } : void 0;
						controller.enqueue({
							type: "reasoning-end",
							id: open.id,
							...providerMetadata ? { providerMetadata } : {}
						});
					} else if (open.kind === "image") {
						const google2 = {};
						if (interactionId != null) google2.interactionId = interactionId;
						const providerMetadata = Object.keys(google2).length > 0 ? { google: google2 } : void 0;
						if (open.data != null && open.data.length > 0) controller.enqueue({
							type: "file",
							mediaType: (_m = open.mimeType) != null ? _m : "image/png",
							data: {
								type: "data",
								data: open.data
							},
							...providerMetadata ? { providerMetadata } : {}
						});
						else if (open.uri != null && open.uri.length > 0) controller.enqueue({
							type: "file",
							mediaType: (_n = open.mimeType) != null ? _n : "image/png",
							data: {
								type: "url",
								url: new URL(open.uri)
							},
							...providerMetadata ? { providerMetadata } : {}
						});
					} else if (open.kind === "function_call") {
						const accumulated = open.argumentsAccum.length > 0 ? open.argumentsAccum : "{}";
						controller.enqueue({
							type: "tool-input-end",
							id: open.toolCallId
						});
						const google2 = {};
						if (open.signature != null) google2.signature = open.signature;
						if (interactionId != null) google2.interactionId = interactionId;
						const providerMetadata = Object.keys(google2).length > 0 ? { google: google2 } : void 0;
						controller.enqueue({
							type: "tool-call",
							toolCallId: open.toolCallId,
							toolName: open.toolName,
							input: accumulated,
							...providerMetadata ? { providerMetadata } : {}
						});
					} else if (open.kind === "builtin_tool_call" && !open.callEmitted) {
						controller.enqueue({
							type: "tool-call",
							toolCallId: open.toolCallId,
							toolName: open.toolName,
							input: JSON.stringify((_o = open.arguments) != null ? _o : {}),
							providerExecuted: true
						});
						open.callEmitted = true;
					} else if (open.kind === "builtin_tool_result" && !open.resultEmitted) {
						controller.enqueue({
							type: "tool-result",
							toolCallId: open.callId,
							toolName: open.toolName,
							result: (_p = open.result) != null ? _p : null
						});
						open.resultEmitted = true;
						const sources = builtinToolResultToSources({
							block: {
								type: open.blockType,
								call_id: open.callId,
								result: open.result
							},
							generateId: generateId4
						});
						for (const source of sources) {
							const key = sourceKey(source);
							if (emittedSourceKeys.has(key)) continue;
							emittedSourceKeys.add(key);
							controller.enqueue(source);
						}
					}
					openBlocks.delete(event.index);
					break;
				}
				case "interaction.status_update":
				case "interaction.in_progress":
				case "interaction.requires_action": {
					const event = value;
					if (event.status != null) finishStatus = event.status;
					else if (eventType === "interaction.requires_action") finishStatus = "requires_action";
					else finishStatus = "in_progress";
					break;
				}
				case "interaction.completed": {
					const interaction = value.interaction;
					if ((interaction == null ? void 0 : interaction.id) != null && interaction.id.length > 0) interactionId = interaction.id;
					if ((interaction == null ? void 0 : interaction.status) != null) finishStatus = interaction.status;
					if ((interaction == null ? void 0 : interaction.usage) != null) usage = interaction.usage;
					if ((interaction == null ? void 0 : interaction.service_tier) != null) serviceTier = interaction.service_tier;
					break;
				}
				case "error": {
					const event = value;
					finishStatus = "failed";
					controller.enqueue({
						type: "error",
						error: createProviderStreamError({
							message: (_r = (_q = event.error) == null ? void 0 : _q.message) != null ? _r : "Unknown interaction error",
							type: event.event_type,
							code: (_t = (_s = event.error) == null ? void 0 : _s.code) != null ? _t : void 0,
							data: event
						})
					});
					break;
				}
			}
		},
		flush(controller) {
			const finishReason = {
				unified: mapGoogleInteractionsFinishReason({
					status: finishStatus,
					hasFunctionCall
				}),
				raw: finishStatus
			};
			const outputTokensByModality = getGoogleInteractionsOutputTokensByModality(usage);
			const providerMetadata = { google: {
				...interactionId != null ? { interactionId } : {},
				...serviceTier != null ? { serviceTier } : {},
				...outputTokensByModality != null ? { outputTokensByModality } : {}
			} };
			controller.enqueue({
				type: "finish",
				finishReason,
				usage: convertGoogleInteractionsUsage(usage),
				providerMetadata
			});
		}
	});
}
function convertToGoogleInteractionsInput({ prompt, previousInteractionId, store, mediaResolution }) {
	var _a, _b, _c, _d, _e, _f, _g;
	const warnings = [];
	const incoherentCombo = previousInteractionId != null && store === false;
	const shouldCompact = previousInteractionId != null && store !== false;
	if (incoherentCombo) warnings.push({
		type: "other",
		message: "google.interactions: providerOptions.google.previousInteractionId was set together with store: false. These are incoherent (the prior interaction cannot be referenced when nothing was stored on the server); the full history will be sent and previous_interaction_id will still be emitted."
	});
	const compactedPrompt = shouldCompact ? compactPromptForPreviousInteraction({
		prompt,
		previousInteractionId
	}) : prompt;
	const systemTexts = [];
	const steps = [];
	for (const message of compactedPrompt) switch (message.role) {
		case "system":
			systemTexts.push(message.content);
			break;
		case "user": {
			const content = [];
			for (const part of message.content) if (part.type === "text") content.push({
				type: "text",
				text: part.text
			});
			else if (part.type === "file") {
				const fileBlock = convertFilePartToContent({
					part,
					warnings,
					mediaResolution
				});
				if (fileBlock != null) content.push(fileBlock);
			}
			const merged = mergeAdjacentTextContent(content);
			if (merged.length > 0) steps.push({
				type: "user_input",
				content: merged
			});
			break;
		}
		case "assistant": {
			let pendingModelOutput = [];
			const flushModelOutput = () => {
				if (pendingModelOutput.length > 0) {
					steps.push({
						type: "model_output",
						content: pendingModelOutput
					});
					pendingModelOutput = [];
				}
			};
			for (const part of message.content) if (part.type === "text") pendingModelOutput.push({
				type: "text",
				text: part.text
			});
			else if (part.type === "reasoning") {
				flushModelOutput();
				const signature = (_b = (_a = part.providerOptions) == null ? void 0 : _a.google) == null ? void 0 : _b.signature;
				steps.push({
					type: "thought",
					...signature != null ? { signature } : {},
					summary: part.text.length > 0 ? [{
						type: "text",
						text: part.text
					}] : void 0
				});
			} else if (part.type === "file") {
				const fileBlock = convertFilePartToContent({
					part,
					warnings,
					mediaResolution
				});
				if (fileBlock != null) pendingModelOutput.push(fileBlock);
			} else if (part.type === "tool-call") {
				flushModelOutput();
				const signature = (_d = (_c = part.providerOptions) == null ? void 0 : _c.google) == null ? void 0 : _d.signature;
				const args = typeof part.input === "string" ? safeParseToolArgs(part.input) : (_e = part.input) != null ? _e : {};
				steps.push({
					type: "function_call",
					id: part.toolCallId,
					name: part.toolName,
					arguments: args,
					...signature != null ? { signature } : {}
				});
			} else warnings.push({
				type: "other",
				message: `google.interactions: unsupported assistant content part type "${part.type}"; part dropped.`
			});
			flushModelOutput();
			break;
		}
		case "tool": {
			const content = [];
			for (const part of message.content) {
				if (part.type !== "tool-result") {
					warnings.push({
						type: "other",
						message: `google.interactions: unsupported tool message part type "${part.type}"; part dropped.`
					});
					continue;
				}
				const block = convertToolResultPart({
					toolCallId: part.toolCallId,
					toolName: part.toolName,
					output: part.output,
					signature: (_g = (_f = part.providerOptions) == null ? void 0 : _f.google) == null ? void 0 : _g.signature,
					warnings
				});
				content.push(block);
			}
			if (content.length > 0) steps.push({
				type: "user_input",
				content
			});
			break;
		}
	}
	return {
		input: steps,
		systemInstruction: systemTexts.length > 0 ? systemTexts.join("\n\n") : void 0,
		warnings
	};
}
function convertFilePartToContent({ part, warnings, mediaResolution }) {
	if (part.data.type === "text") return {
		type: "text",
		text: part.data.text
	};
	const topLevel = getTopLevelMediaType(part.mediaType);
	let kind;
	switch (topLevel) {
		case "image":
			kind = "image";
			break;
		case "audio":
			kind = "audio";
			break;
		case "video":
			kind = "video";
			break;
		case "application":
		case "text":
			kind = "document";
			break;
		default: kind = void 0;
	}
	if (kind == null) {
		warnings.push({
			type: "other",
			message: `google.interactions: unsupported file media type "${part.mediaType}"; part dropped.`
		});
		return;
	}
	const resolutionField = mediaResolution != null && (kind === "image" || kind === "video") ? { resolution: mediaResolution } : {};
	switch (part.data.type) {
		case "data": {
			const mimeType = resolveFullMediaType({ part });
			return {
				type: kind,
				data: convertToBase64(part.data.data),
				mime_type: mimeType,
				...resolutionField
			};
		}
		case "url": return {
			type: kind,
			uri: part.data.url.toString(),
			...isFullMediaType(part.mediaType) ? { mime_type: part.mediaType } : {},
			...resolutionField
		};
		case "reference": {
			const uri = resolveProviderReference({
				reference: part.data.reference,
				provider: "google"
			});
			return {
				type: kind,
				uri,
				...isFullMediaType(part.mediaType) ? { mime_type: part.mediaType } : {},
				...resolutionField
			};
		}
	}
}
function compactPromptForPreviousInteraction({ prompt, previousInteractionId }) {
	const out = [];
	const droppedToolCallIds = /* @__PURE__ */ new Set();
	for (const message of prompt) {
		if (message.role === "assistant") {
			if (message.content.some((part) => {
				var _a, _b;
				return ((_b = (_a = part.providerOptions) == null ? void 0 : _a.google) == null ? void 0 : _b.interactionId) === previousInteractionId;
			})) {
				for (const part of message.content) if (part.type === "tool-call") droppedToolCallIds.add(part.toolCallId);
				continue;
			}
			out.push(message);
			continue;
		}
		if (message.role === "tool") {
			const remaining = message.content.filter((part) => {
				if (part.type !== "tool-result") return true;
				return !droppedToolCallIds.has(part.toolCallId);
			});
			if (remaining.length === 0) continue;
			out.push({
				...message,
				content: remaining
			});
			continue;
		}
		out.push(message);
	}
	return out;
}
function safeParseToolArgs(input) {
	try {
		const parsed = secureJsonParse(input);
		if (parsed != null && typeof parsed === "object" && !Array.isArray(parsed)) return parsed;
		return { value: parsed };
	} catch (e) {
		return { value: input };
	}
}
function convertToolResultPart({ toolCallId, toolName, output, signature, warnings }) {
	var _a;
	const base = {
		type: "function_result",
		call_id: toolCallId,
		name: toolName,
		...signature != null ? { signature } : {}
	};
	switch (output.type) {
		case "text": return {
			...base,
			result: output.value
		};
		case "json": return {
			...base,
			result: JSON.stringify(output.value)
		};
		case "error-text": return {
			...base,
			is_error: true,
			result: output.value
		};
		case "error-json": return {
			...base,
			is_error: true,
			result: JSON.stringify(output.value)
		};
		case "execution-denied": return {
			...base,
			is_error: true,
			result: (_a = output.reason) != null ? _a : "Tool execution denied by user."
		};
		case "content": {
			const blocks = [];
			for (const item of output.value) if (item.type === "text") blocks.push({
				type: "text",
				text: item.text
			});
			else if (item.type === "file") {
				if (getTopLevelMediaType(item.mediaType) !== "image") {
					warnings.push({
						type: "other",
						message: `google.interactions: tool-result file with mediaType "${item.mediaType}" is not supported (Interactions \`function_result.result\` accepts only text and image content); part dropped.`
					});
					continue;
				}
				const imageBlock = filePartToImageBlock({
					part: item,
					warnings
				});
				if (imageBlock != null) blocks.push(imageBlock);
			} else warnings.push({
				type: "other",
				message: `google.interactions: tool-result content part type "${item.type}" is not supported; part dropped.`
			});
			return {
				...base,
				result: blocks
			};
		}
	}
}
function filePartToImageBlock({ part, warnings }) {
	switch (part.data.type) {
		case "data": {
			const mimeType = isFullMediaType(part.mediaType) ? part.mediaType : resolveFullMediaType({ part: {
				type: "file",
				mediaType: part.mediaType,
				data: part.data
			} });
			return {
				type: "image",
				data: convertToBase64(part.data.data),
				mime_type: mimeType
			};
		}
		case "url": return {
			type: "image",
			uri: part.data.url.toString(),
			...isFullMediaType(part.mediaType) ? { mime_type: part.mediaType } : {}
		};
		case "reference": return {
			type: "image",
			uri: resolveProviderReference({
				reference: part.data.reference,
				provider: "google"
			}),
			...isFullMediaType(part.mediaType) ? { mime_type: part.mediaType } : {}
		};
		case "text":
			warnings.push({
				type: "other",
				message: "google.interactions: tool-result image part with `data.type === \"text\"` is not representable as an image; part dropped."
			});
			return;
	}
}
function mergeAdjacentTextContent(content) {
	if (content.length < 2) return content;
	const result = [];
	for (const block of content) {
		const last = result[result.length - 1];
		if (block.type === "text" && last != null && last.type === "text" && last.annotations == null && block.annotations == null) {
			const merged = {
				type: "text",
				text: `${last.text}

${block.text}`
			};
			result[result.length - 1] = merged;
			continue;
		}
		result.push(block);
	}
	return result;
}
var tokenByModalitySchema = () => object({
	modality: string().nullish(),
	tokens: number().nullish()
}).loose();
var usageSchema2 = () => object({
	total_input_tokens: number().nullish(),
	total_output_tokens: number().nullish(),
	total_thought_tokens: number().nullish(),
	total_cached_tokens: number().nullish(),
	total_tool_use_tokens: number().nullish(),
	total_tokens: number().nullish(),
	input_tokens_by_modality: array(tokenByModalitySchema()).nullish(),
	output_tokens_by_modality: array(tokenByModalitySchema()).nullish(),
	cached_tokens_by_modality: array(tokenByModalitySchema()).nullish(),
	tool_use_tokens_by_modality: array(tokenByModalitySchema()).nullish(),
	grounding_tool_count: array(object({
		type: string().nullish(),
		count: number().nullish()
	}).loose()).nullish()
}).loose();
var interactionStatusSchema = () => _enum([
	"in_progress",
	"requires_action",
	"completed",
	"failed",
	"cancelled",
	"incomplete"
]);
var annotationSchema = () => {
	const urlCitation = object({
		type: literal("url_citation"),
		url: string().nullish(),
		title: string().nullish(),
		start_index: number().nullish(),
		end_index: number().nullish()
	}).loose();
	const fileCitation = object({
		type: literal("file_citation"),
		file_name: string().nullish(),
		document_uri: string().nullish(),
		url: string().nullish(),
		page_number: number().nullish(),
		media_id: string().nullish(),
		start_index: number().nullish(),
		end_index: number().nullish(),
		custom_metadata: record(string(), unknown()).nullish()
	}).loose();
	const placeCitation = object({
		type: literal("place_citation"),
		name: string().nullish(),
		url: string().nullish(),
		place_id: string().nullish(),
		start_index: number().nullish(),
		end_index: number().nullish()
	}).loose();
	return union([
		urlCitation,
		fileCitation,
		placeCitation,
		object({ type: string() }).loose()
	]);
};
var thoughtSummaryItemSchema = () => object({
	type: string(),
	text: string().nullish(),
	data: string().nullish(),
	mime_type: string().nullish()
}).loose();
var contentBlockSchema = () => {
	const textContent = object({
		type: literal("text"),
		text: string(),
		annotations: array(annotationSchema()).nullish()
	}).loose();
	const imageContent = object({
		type: literal("image"),
		data: string().nullish(),
		mime_type: string().nullish(),
		resolution: _enum([
			"low",
			"medium",
			"high",
			"ultra_high"
		]).nullish(),
		uri: string().nullish()
	}).loose();
	const videoContent = object({
		type: literal("video"),
		data: string().nullish(),
		mime_type: string().nullish(),
		uri: string().nullish()
	}).loose();
	return union([
		textContent,
		imageContent,
		videoContent,
		object({ type: string() }).loose()
	]);
};
var BUILTIN_TOOL_CALL_STEP_TYPES = [
	"google_search_call",
	"code_execution_call",
	"url_context_call",
	"file_search_call",
	"google_maps_call",
	"mcp_server_tool_call"
];
var BUILTIN_TOOL_RESULT_STEP_TYPES = [
	"google_search_result",
	"code_execution_result",
	"url_context_result",
	"file_search_result",
	"google_maps_result",
	"mcp_server_tool_result"
];
var stepSchema = () => {
	const userInputStep = object({
		type: literal("user_input"),
		content: array(contentBlockSchema()).nullish()
	}).loose();
	const modelOutputStep = object({
		type: literal("model_output"),
		content: array(contentBlockSchema()).nullish()
	}).loose();
	const functionCallStep = object({
		type: literal("function_call"),
		id: string(),
		name: string(),
		arguments: record(string(), unknown()).nullish(),
		signature: string().nullish()
	}).loose();
	const thoughtStep = object({
		type: literal("thought"),
		signature: string().nullish(),
		summary: array(thoughtSummaryItemSchema()).nullish()
	}).loose();
	const builtinToolCallStep = object({
		type: _enum(BUILTIN_TOOL_CALL_STEP_TYPES),
		id: string(),
		arguments: record(string(), unknown()).nullish(),
		name: string().nullish(),
		server_name: string().nullish(),
		search_type: string().nullish(),
		signature: string().nullish()
	}).loose();
	const builtinToolResultStep = object({
		type: _enum(BUILTIN_TOOL_RESULT_STEP_TYPES),
		call_id: string(),
		result: unknown().nullish(),
		is_error: boolean().nullish(),
		name: string().nullish(),
		server_name: string().nullish(),
		signature: string().nullish()
	}).loose();
	return union([
		userInputStep,
		modelOutputStep,
		functionCallStep,
		thoughtStep,
		builtinToolCallStep,
		builtinToolResultStep,
		object({ type: string() }).loose()
	]);
};
var googleInteractionsResponseSchema = lazySchema(() => zodSchema(object({
	id: string().nullish(),
	created: string().nullish(),
	updated: string().nullish(),
	status: interactionStatusSchema(),
	model: string().nullish(),
	agent: string().nullish(),
	steps: array(stepSchema()).nullish(),
	usage: usageSchema2().nullish(),
	service_tier: string().nullish(),
	previous_interaction_id: string().nullish(),
	response_modalities: array(string()).nullish()
}).loose()));
var googleInteractionsEventSchema = lazySchema(() => zodSchema((() => {
	const status = interactionStatusSchema();
	const annotation = annotationSchema();
	const thoughtSummaryItem = thoughtSummaryItemSchema();
	const interactionCreatedEvent = object({
		event_type: literal("interaction.created"),
		event_id: string().nullish(),
		interaction: object({
			id: string().nullish(),
			created: string().nullish(),
			model: string().nullish(),
			agent: string().nullish(),
			status: status.nullish()
		}).loose()
	}).loose();
	const stepStartEvent = object({
		event_type: literal("step.start"),
		event_id: string().nullish(),
		index: number(),
		step: stepSchema()
	}).loose();
	const stepDeltaText = object({
		type: literal("text"),
		text: string()
	}).loose();
	const stepDeltaThoughtSummary = object({
		type: literal("thought_summary"),
		content: thoughtSummaryItem.nullish()
	}).loose();
	const stepDeltaThoughtSignature = object({
		type: literal("thought_signature"),
		signature: string().nullish()
	}).loose();
	const stepDeltaArgumentsDelta = object({
		type: literal("arguments_delta"),
		arguments: string().nullish(),
		id: string().nullish(),
		signature: string().nullish()
	}).loose();
	const stepDeltaTextAnnotation = object({
		type: _enum(["text_annotation_delta", "text_annotation"]),
		annotations: array(annotation).nullish()
	}).loose();
	const stepDeltaImage = object({
		type: literal("image"),
		data: string().nullish(),
		mime_type: string().nullish(),
		resolution: _enum([
			"low",
			"medium",
			"high",
			"ultra_high"
		]).nullish(),
		uri: string().nullish()
	}).loose();
	const stepDeltaVideo = object({
		type: literal("video"),
		data: string().nullish(),
		mime_type: string().nullish(),
		uri: string().nullish()
	}).loose();
	const stepDeltaBuiltinToolCall = object({
		type: _enum(BUILTIN_TOOL_CALL_STEP_TYPES),
		id: string().nullish(),
		arguments: record(string(), unknown()).nullish(),
		name: string().nullish(),
		server_name: string().nullish(),
		search_type: string().nullish(),
		signature: string().nullish()
	}).loose();
	const stepDeltaBuiltinToolResult = object({
		type: _enum(BUILTIN_TOOL_RESULT_STEP_TYPES),
		call_id: string().nullish(),
		result: unknown().nullish(),
		is_error: boolean().nullish(),
		name: string().nullish(),
		server_name: string().nullish(),
		signature: string().nullish()
	}).loose();
	const stepDeltaUnknown = object({ type: string() }).loose();
	const stepDeltaUnion = union([
		stepDeltaText,
		stepDeltaImage,
		stepDeltaVideo,
		stepDeltaThoughtSummary,
		stepDeltaThoughtSignature,
		stepDeltaArgumentsDelta,
		stepDeltaTextAnnotation,
		stepDeltaBuiltinToolCall,
		stepDeltaBuiltinToolResult,
		stepDeltaUnknown
	]);
	const stepDeltaEvent = object({
		event_type: literal("step.delta"),
		event_id: string().nullish(),
		index: number(),
		delta: stepDeltaUnion
	}).loose();
	const stepStopEvent = object({
		event_type: literal("step.stop"),
		event_id: string().nullish(),
		index: number()
	}).loose();
	const interactionStatusUpdateEvent = object({
		event_type: literal("interaction.status_update"),
		event_id: string().nullish(),
		interaction_id: string().nullish(),
		status: status.nullish()
	}).loose();
	const interactionInProgressEvent = object({
		event_type: literal("interaction.in_progress"),
		event_id: string().nullish(),
		interaction_id: string().nullish(),
		status: status.nullish()
	}).loose();
	const interactionRequiresActionEvent = object({
		event_type: literal("interaction.requires_action"),
		event_id: string().nullish(),
		interaction_id: string().nullish(),
		status: status.nullish()
	}).loose();
	const interactionCompletedEvent = object({
		event_type: literal("interaction.completed"),
		event_id: string().nullish(),
		interaction: object({
			id: string().nullish(),
			status: status.nullish(),
			usage: usageSchema2().nullish(),
			service_tier: string().nullish()
		}).loose()
	}).loose();
	const errorEvent = object({
		event_type: literal("error"),
		event_id: string().nullish(),
		error: object({
			code: string().nullish(),
			message: string().nullish()
		}).loose().nullish()
	}).loose();
	const unknownEvent = object({ event_type: string() }).loose();
	return union([
		interactionCreatedEvent,
		stepStartEvent,
		stepDeltaEvent,
		stepStopEvent,
		interactionStatusUpdateEvent,
		interactionInProgressEvent,
		interactionRequiresActionEvent,
		interactionCompletedEvent,
		errorEvent,
		unknownEvent
	]);
})()));
var googleInteractionsLanguageModelOptions = lazySchema(() => zodSchema(object({
	previousInteractionId: string().nullish(),
	store: boolean().nullish(),
	agent: string().nullish(),
	agentConfig: union([object({ type: literal("dynamic") }).loose(), object({
		type: literal("deep-research"),
		thinkingSummaries: _enum(["auto", "none"]).nullish(),
		visualization: _enum(["off", "auto"]).nullish(),
		collaborativePlanning: boolean().nullish()
	})]).nullish(),
	thinkingLevel: _enum([
		"minimal",
		"low",
		"medium",
		"high"
	]).nullish(),
	thinkingSummaries: _enum(["auto", "none"]).nullish(),
	/**
	* Output-format entries that map directly to the API's `response_format`
	* array. Use this to request image, audio, or non-JSON text outputs
	* with full control over `mime_type`, `aspect_ratio`, and `image_size`.
	*
	* Entries are sent in order. The AI SDK call-level `responseFormat: {
	* type: 'json', schema }` still drives JSON-mode and adds a matching
	* text entry automatically; entries listed here are appended.
	*/
	responseFormat: array(union([
		object({
			type: literal("text"),
			mimeType: string().nullish(),
			schema: unknown().nullish()
		}).loose(),
		object({
			type: literal("image"),
			mimeType: string().nullish(),
			aspectRatio: _enum([
				"1:1",
				"2:3",
				"3:2",
				"3:4",
				"4:3",
				"4:5",
				"5:4",
				"9:16",
				"16:9",
				"21:9",
				"1:8",
				"8:1",
				"1:4",
				"4:1"
			]).nullish(),
			imageSize: _enum([
				"1K",
				"2K",
				"4K",
				"512"
			]).nullish()
		}).loose(),
		object({
			type: literal("audio"),
			mimeType: string().nullish()
		}).loose()
	])).nullish(),
	/**
	* @deprecated Use `responseFormat` with a `{ type: 'image', ... }`
	* entry instead. Retained for backwards compatibility; the SDK
	* translates it into a matching `response_format` image entry and
	* emits a warning when set.
	*/
	imageConfig: object({
		aspectRatio: _enum([
			"1:1",
			"2:3",
			"3:2",
			"3:4",
			"4:3",
			"4:5",
			"5:4",
			"9:16",
			"16:9",
			"21:9",
			"1:8",
			"8:1",
			"1:4",
			"4:1"
		]).nullish(),
		imageSize: _enum([
			"1K",
			"2K",
			"4K",
			"512"
		]).nullish()
	}).nullish(),
	mediaResolution: _enum([
		"low",
		"medium",
		"high",
		"ultra_high"
	]).nullish(),
	responseModalities: array(_enum([
		"text",
		"image",
		"audio",
		"video",
		"document"
	])).nullish(),
	serviceTier: _enum([
		"flex",
		"standard",
		"priority"
	]).nullish(),
	/**
	* Alternative to AI SDK `system` message. If both are set, the AI SDK
	* `system` message wins and a warning is emitted.
	*/
	systemInstruction: string().nullish(),
	/**
	* Per-block signature for round-tripping `thought.signature` and
	* `function_call.signature` blocks. Set by the SDK on output reasoning /
	* tool-call parts; passed back unchanged on input parts so the API
	* accepts the prior turn.
	*/
	signature: string().nullish(),
	/**
	* Set by the SDK on output assistant messages. The converter uses it to
	* decide which messages to drop when compacting under
	* `previousInteractionId`.
	*/
	interactionId: string().nullish(),
	/**
	* Maximum time, in milliseconds, to poll a background interaction (agent
	* call) before giving up. Defaults to 30 minutes. Long-running agents
	* such as deep research can take tens of minutes — increase if needed.
	*/
	pollingTimeoutMs: number().int().positive().nullish(),
	/**
	* Run the interaction in the background. Required for agents whose
	* server-side workflow cannot complete within a single request/response.
	* When `true`, the POST returns with a non-terminal status and the SDK
	* polls `GET /interactions/{id}` until the work completes. Some agents
	* reject `true`; see the agent's documentation for which mode it
	* requires.
	*/
	background: boolean().nullish(),
	/**
	* Environment configuration for the agent sandbox. Only applies to agent
	* calls (`google.interactions({ agent })`); ignored on model-id calls.
	*
	*   - `"remote"`: provision a fresh sandbox for this call.
	*   - any other string: an existing `environment_id` to reuse.
	*   - object: provision a fresh sandbox and optionally preload `sources`
	*     and/or constrain outbound traffic via `network`.
	*/
	environment: union([string(), object({
		type: literal("remote"),
		sources: array(union([
			object({
				type: literal("gcs"),
				source: string(),
				target: string().nullish()
			}),
			object({
				type: literal("repository"),
				source: string(),
				target: string().nullish()
			}),
			object({
				type: literal("inline"),
				content: string(),
				target: string()
			})
		])).nullish(),
		network: union([literal("disabled"), object({ allowlist: array(object({
			domain: string(),
			transform: array(record(string(), string())).nullish()
		})) })]).nullish()
	})]).nullish()
})));
function googleProviderMetadata({ signature, interactionId }) {
	const google2 = {};
	if (signature != null) google2.signature = signature;
	if (interactionId != null) google2.interactionId = interactionId;
	return Object.keys(google2).length > 0 ? { providerMetadata: { google: google2 } } : {};
}
var BUILTIN_TOOL_CALL_TYPES2 = /* @__PURE__ */ new Set([
	"google_search_call",
	"code_execution_call",
	"url_context_call",
	"file_search_call",
	"google_maps_call",
	"mcp_server_tool_call"
]);
var BUILTIN_TOOL_RESULT_TYPES2 = /* @__PURE__ */ new Set([
	"google_search_result",
	"code_execution_result",
	"url_context_result",
	"file_search_result",
	"google_maps_result",
	"mcp_server_tool_result"
]);
function builtinToolNameFromCallType2(type) {
	return type.replace(/_call$/, "");
}
function builtinToolNameFromResultType2(type) {
	return type.replace(/_result$/, "");
}
function parseGoogleInteractionsOutputs({ steps, generateId: generateId4, interactionId }) {
	var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
	const content = [];
	let hasFunctionCall = false;
	if (steps == null) return {
		content,
		hasFunctionCall
	};
	for (const step of steps) {
		if (step == null || typeof step !== "object") continue;
		const type = step.type;
		if (typeof type !== "string") continue;
		switch (type) {
			case "user_input": break;
			case "model_output": {
				const blocks = (_a = step.content) != null ? _a : [];
				for (const block of blocks) {
					if (block == null || typeof block !== "object") continue;
					const blockType = block.type;
					if (blockType === "text") {
						const text = (_b = block.text) != null ? _b : "";
						const annotations = block.annotations;
						content.push({
							type: "text",
							text,
							...googleProviderMetadata({ interactionId })
						});
						const sources = annotationsToSources({
							annotations,
							generateId: generateId4
						});
						for (const source of sources) content.push(source);
					} else if (blockType === "image") {
						const image = block;
						if (image.data != null && image.data.length > 0) content.push({
							type: "file",
							mediaType: (_c = image.mime_type) != null ? _c : "image/png",
							data: {
								type: "data",
								data: image.data
							},
							...googleProviderMetadata({ interactionId })
						});
						else if (image.uri != null && image.uri.length > 0) content.push({
							type: "file",
							mediaType: (_d = image.mime_type) != null ? _d : "image/png",
							data: {
								type: "url",
								url: new URL(image.uri)
							},
							...googleProviderMetadata({ interactionId })
						});
					} else if (blockType === "video") {
						const video = block;
						if (video.data != null && video.data.length > 0) content.push({
							type: "file",
							mediaType: (_e = video.mime_type) != null ? _e : "video/mp4",
							data: {
								type: "data",
								data: video.data
							},
							...googleProviderMetadata({ interactionId })
						});
						else if (video.uri != null && video.uri.length > 0) content.push({
							type: "file",
							mediaType: (_f = video.mime_type) != null ? _f : "video/mp4",
							data: {
								type: "url",
								url: new URL(video.uri)
							},
							...googleProviderMetadata({ interactionId })
						});
					}
				}
				break;
			}
			case "thought": {
				const thought = step;
				const text = (Array.isArray(thought.summary) ? thought.summary : []).filter((item) => (item == null ? void 0 : item.type) === "text" && typeof item.text === "string").map((item) => item.text).join("\n");
				content.push({
					type: "reasoning",
					text,
					...googleProviderMetadata({
						signature: thought.signature,
						interactionId
					})
				});
				break;
			}
			case "function_call": {
				hasFunctionCall = true;
				const call = step;
				content.push({
					type: "tool-call",
					toolCallId: call.id,
					toolName: call.name,
					input: JSON.stringify((_g = call.arguments) != null ? _g : {}),
					...googleProviderMetadata({
						signature: call.signature,
						interactionId
					})
				});
				break;
			}
			default: if (BUILTIN_TOOL_CALL_TYPES2.has(type)) {
				const call = step;
				const toolName = type === "mcp_server_tool_call" ? (_h = call.name) != null ? _h : "mcp_server_tool" : builtinToolNameFromCallType2(type);
				const input = JSON.stringify((_i = call.arguments) != null ? _i : {});
				content.push({
					type: "tool-call",
					toolCallId: call.id || generateId4(),
					toolName,
					input,
					providerExecuted: true
				});
			} else if (BUILTIN_TOOL_RESULT_TYPES2.has(type)) {
				const result = step;
				const toolName = type === "mcp_server_tool_result" ? (_j = result.name) != null ? _j : "mcp_server_tool" : builtinToolNameFromResultType2(type);
				content.push({
					type: "tool-result",
					toolCallId: result.call_id || generateId4(),
					toolName,
					result: (_k = result.result) != null ? _k : null
				});
				const sources = builtinToolResultToSources({
					block: step,
					generateId: generateId4
				});
				for (const source of sources) content.push(source);
			}
		}
	}
	return {
		content,
		hasFunctionCall
	};
}
var getOriginalFetch = () => globalThis.fetch;
async function cancelGoogleInteraction({ baseURL, interactionId, headers, fetch: fetch2 = getOriginalFetch() }) {
	if (interactionId == null || interactionId.length === 0) return;
	const url = `${baseURL}/interactions/${encodeURIComponent(interactionId)}/cancel`;
	try {
		const response = await fetch2(url, {
			method: "POST",
			headers: withUserAgentSuffix(combineHeaders({ "Content-Type": "application/json" }, headers), getRuntimeEnvironmentUserAgent()),
			body: "{}"
		});
		try {
			await response.text();
		} catch (e) {}
	} catch (e) {}
}
var TERMINAL_STATUSES = /* @__PURE__ */ new Set([
	"completed",
	"failed",
	"cancelled",
	"incomplete"
]);
function isTerminalStatus(status) {
	return status != null && TERMINAL_STATUSES.has(status);
}
var DEFAULT_INITIAL_DELAY_MS = 1e3;
var DEFAULT_MAX_DELAY_MS = 1e4;
var DEFAULT_TIMEOUT_MS = 18e5;
async function pollGoogleInteractionUntilTerminal({ baseURL, interactionId, headers, fetch: fetch2, abortSignal, initialDelayMs = DEFAULT_INITIAL_DELAY_MS, maxDelayMs = DEFAULT_MAX_DELAY_MS, timeoutMs = DEFAULT_TIMEOUT_MS }) {
	if (interactionId == null || interactionId.length === 0) throw new Error("google.interactions: cannot poll a background interaction without an id. The POST response did not include an interaction id.");
	const startedAt = Date.now();
	let nextDelayMs = initialDelayMs;
	const url = `${baseURL}/interactions/${encodeURIComponent(interactionId)}`;
	const cancelOnServer = () => cancelGoogleInteraction({
		baseURL,
		interactionId,
		headers,
		fetch: fetch2
	});
	try {
		while (true) {
			if (abortSignal == null ? void 0 : abortSignal.aborted) {
				await cancelOnServer();
				throw new DOMException("Polling was aborted", "AbortError");
			}
			if (Date.now() - startedAt > timeoutMs) throw new Error(`google.interactions: timed out polling interaction ${interactionId} after ${timeoutMs}ms.`);
			await delay(nextDelayMs, { abortSignal });
			const { value: response, rawValue: rawResponse, responseHeaders } = await getFromApi({
				url,
				validateUrl: false,
				headers,
				failedResponseHandler: googleFailedResponseHandler,
				successfulResponseHandler: createJsonResponseHandler(googleInteractionsResponseSchema),
				abortSignal,
				fetch: fetch2
			});
			if (isTerminalStatus(response.status)) return {
				response,
				rawResponse,
				responseHeaders
			};
			nextDelayMs = Math.min(nextDelayMs * 2, maxDelayMs);
		}
	} catch (error) {
		if (isAbortError(error)) await cancelOnServer();
		throw error;
	}
}
function prepareGoogleInteractionsTools({ tools, toolChoice }) {
	var _a, _b, _c, _d;
	const toolWarnings = [];
	const normalized = (tools == null ? void 0 : tools.length) ? tools : void 0;
	if (normalized == null) return {
		tools: void 0,
		toolChoice: void 0,
		toolWarnings
	};
	const interactionsTools = [];
	for (const tool of normalized) {
		if (tool.type === "function") {
			interactionsTools.push({
				type: "function",
				name: tool.name,
				description: (_a = tool.description) != null ? _a : "",
				parameters: tool.inputSchema
			});
			continue;
		}
		if (tool.type === "provider") {
			const args = (_b = tool.args) != null ? _b : {};
			switch (tool.id) {
				case "google.google_search": {
					const searchTypesArg = args.searchTypes;
					let search_types;
					if (searchTypesArg != null && typeof searchTypesArg === "object") {
						const list = [];
						if (searchTypesArg.webSearch != null) list.push("web_search");
						if (searchTypesArg.imageSearch != null) list.push("image_search");
						if (list.length > 0) search_types = list;
					}
					interactionsTools.push({
						type: "google_search",
						...search_types != null ? { search_types } : {}
					});
					break;
				}
				case "google.code_execution":
					interactionsTools.push({ type: "code_execution" });
					break;
				case "google.url_context":
					interactionsTools.push({ type: "url_context" });
					break;
				case "google.file_search":
					interactionsTools.push({
						type: "file_search",
						...args.fileSearchStoreNames != null ? { file_search_store_names: args.fileSearchStoreNames } : {},
						...args.topK != null ? { top_k: args.topK } : {},
						...args.metadataFilter != null ? { metadata_filter: args.metadataFilter } : {}
					});
					break;
				case "google.google_maps":
					interactionsTools.push({
						type: "google_maps",
						...args.latitude != null ? { latitude: args.latitude } : {},
						...args.longitude != null ? { longitude: args.longitude } : {},
						...args.enableWidget != null ? { enable_widget: args.enableWidget } : {}
					});
					break;
				case "google.computer_use":
					interactionsTools.push({
						type: "computer_use",
						environment: (_c = args.environment) != null ? _c : "browser",
						...args.excludedPredefinedFunctions != null ? { excludedPredefinedFunctions: args.excludedPredefinedFunctions } : {}
					});
					break;
				case "google.mcp_server":
					interactionsTools.push({
						type: "mcp_server",
						...args.name != null ? { name: args.name } : {},
						...args.url != null ? { url: args.url } : {},
						...args.headers != null ? { headers: args.headers } : {},
						...args.allowedTools != null ? { allowed_tools: args.allowedTools } : {}
					});
					break;
				case "google.retrieval": {
					const vertexAiSearchConfig = (_d = args.vertexAiSearchConfig) != null ? _d : void 0;
					interactionsTools.push({
						type: "retrieval",
						...args.retrievalTypes != null ? { retrieval_types: args.retrievalTypes } : { retrieval_types: ["vertex_ai_search"] },
						...vertexAiSearchConfig != null ? { vertex_ai_search_config: vertexAiSearchConfig } : {}
					});
					break;
				}
				default: toolWarnings.push({
					type: "unsupported",
					feature: `provider-defined tool ${tool.id}`,
					details: `provider-defined tool ${tool.id} is not supported by google.interactions; tool dropped.`
				});
			}
			continue;
		}
		toolWarnings.push({
			type: "unsupported",
			feature: `tool of type ${tool.type}`,
			details: "Only function tools and google.* provider-defined tools are supported by google.interactions; tool dropped."
		});
	}
	const hasFunctionTool = interactionsTools.some((t) => t.type === "function");
	let mappedToolChoice;
	if (toolChoice != null && hasFunctionTool) switch (toolChoice.type) {
		case "auto":
			mappedToolChoice = "auto";
			break;
		case "required":
			mappedToolChoice = "any";
			break;
		case "none":
			mappedToolChoice = "none";
			break;
		case "tool": mappedToolChoice = { allowed_tools: {
			mode: "validated",
			tools: [toolChoice.toolName]
		} };
	}
	return {
		tools: interactionsTools.length > 0 ? interactionsTools : void 0,
		toolChoice: mappedToolChoice,
		toolWarnings
	};
}
var DEFAULT_MAX_RETRIES = 3;
var DEFAULT_RETRY_DELAY_MS = 500;
function streamGoogleInteractionEvents({ baseURL, interactionId, headers, fetch: fetch2, abortSignal, maxRetries = DEFAULT_MAX_RETRIES, retryDelayMs = DEFAULT_RETRY_DELAY_MS }) {
	if (interactionId.length === 0) throw new Error("google.interactions: cannot stream a background interaction without an id.");
	const eventSourceHeaders = {
		...headers,
		accept: "text/event-stream"
	};
	let lastEventId;
	let complete = false;
	let attempt = 0;
	let receivedAnyEventThisAttempt = false;
	let currentReader;
	const internalAbort = new AbortController();
	const upstreamAbortHandler = () => internalAbort.abort();
	if (abortSignal != null) if (abortSignal.aborted) internalAbort.abort();
	else abortSignal.addEventListener("abort", upstreamAbortHandler, { once: true });
	const effectiveSignal = internalAbort.signal;
	function buildUrl() {
		const base = `${baseURL}/interactions/${encodeURIComponent(interactionId)}`;
		const params = new URLSearchParams({ stream: "true" });
		if (lastEventId != null) params.set("last_event_id", lastEventId);
		return `${base}?${params.toString()}`;
	}
	async function openReader() {
		const { value: stream } = await getFromApi({
			url: buildUrl(),
			validateUrl: false,
			headers: eventSourceHeaders,
			failedResponseHandler: googleFailedResponseHandler,
			successfulResponseHandler: createEventSourceResponseHandler(googleInteractionsEventSchema),
			abortSignal: effectiveSignal,
			fetch: fetch2
		});
		return stream.getReader();
	}
	return new ReadableStream({
		async start(controller) {
			try {
				while (!complete && !effectiveSignal.aborted) {
					if (currentReader == null) try {
						currentReader = await openReader();
						receivedAnyEventThisAttempt = false;
					} catch (error) {
						if (isAbortError(error) || effectiveSignal.aborted) {
							controller.error(error);
							return;
						}
						attempt++;
						if (attempt >= maxRetries) {
							controller.error(error);
							return;
						}
						await delay(retryDelayMs * attempt, { abortSignal: effectiveSignal });
						continue;
					}
					try {
						const { done, value } = await currentReader.read();
						if (done) {
							currentReader = void 0;
							if (complete) break;
							if (!receivedAnyEventThisAttempt) {
								attempt++;
								if (attempt >= maxRetries) {
									controller.error(/* @__PURE__ */ new Error("google.interactions: SSE stream closed without producing any events."));
									return;
								}
								await delay(retryDelayMs * attempt, { abortSignal: effectiveSignal });
							} else attempt = 0;
							continue;
						}
						receivedAnyEventThisAttempt = true;
						if (value.success) {
							const streamEvent = value.value;
							if (typeof streamEvent.event_id === "string" && streamEvent.event_id.length > 0) lastEventId = streamEvent.event_id;
							if (streamEvent.event_type === "interaction.completed" || streamEvent.event_type === "error") complete = true;
						}
						controller.enqueue(value);
					} catch (error) {
						if (isAbortError(error) || effectiveSignal.aborted) {
							controller.error(error);
							return;
						}
						currentReader = void 0;
						attempt++;
						if (attempt >= maxRetries) {
							controller.error(error);
							return;
						}
						await delay(retryDelayMs * attempt, { abortSignal: effectiveSignal });
					}
				}
				controller.close();
			} catch (error) {
				controller.error(error);
			} finally {
				if (abortSignal != null) abortSignal.removeEventListener("abort", upstreamAbortHandler);
				currentReader?.cancel().catch(() => {});
				currentReader = void 0;
				if (effectiveSignal.aborted && !complete) await cancelGoogleInteraction({
					baseURL,
					interactionId,
					headers,
					fetch: fetch2
				});
			}
		},
		cancel() {
			internalAbort.abort();
			currentReader?.cancel().catch(() => {});
			currentReader = void 0;
		}
	});
}
function synthesizeGoogleInteractionsAgentStream({ response, warnings, generateId: generateId4, includeRawChunks, headerServiceTier }) {
	return new ReadableStream({ start(controller) {
		var _a, _b, _c;
		controller.enqueue({
			type: "stream-start",
			warnings
		});
		const interactionId = typeof response.id === "string" && response.id.length > 0 ? response.id : void 0;
		let timestamp;
		const created = response.created;
		if (typeof created === "string") {
			const parsed = new Date(created);
			if (!Number.isNaN(parsed.getTime())) timestamp = parsed;
		}
		controller.enqueue({
			type: "response-metadata",
			...interactionId != null ? { id: interactionId } : {},
			modelId: (_a = response.model) != null ? _a : void 0,
			...timestamp ? { timestamp } : {}
		});
		if (includeRawChunks) controller.enqueue({
			type: "raw",
			rawValue: response
		});
		const { content, hasFunctionCall } = parseGoogleInteractionsOutputs({
			steps: (_b = response.steps) != null ? _b : null,
			generateId: generateId4,
			interactionId
		});
		let blockCounter = 0;
		const nextBlockId = () => `${interactionId != null ? interactionId : "agent"}:${blockCounter++}`;
		for (const part of content) switch (part.type) {
			case "text": {
				const id = nextBlockId();
				const providerMetadata2 = part.providerMetadata;
				controller.enqueue({
					type: "text-start",
					id
				});
				if (part.text.length > 0) controller.enqueue({
					type: "text-delta",
					id,
					delta: part.text
				});
				controller.enqueue({
					type: "text-end",
					id,
					...providerMetadata2 ? { providerMetadata: providerMetadata2 } : {}
				});
				break;
			}
			case "reasoning": {
				const id = nextBlockId();
				const providerMetadata2 = part.providerMetadata;
				controller.enqueue({
					type: "reasoning-start",
					id
				});
				if (part.text.length > 0) controller.enqueue({
					type: "reasoning-delta",
					id,
					delta: part.text
				});
				controller.enqueue({
					type: "reasoning-end",
					id,
					...providerMetadata2 ? { providerMetadata: providerMetadata2 } : {}
				});
				break;
			}
			case "tool-call": {
				const providerMetadata2 = part.providerMetadata;
				controller.enqueue({
					type: "tool-input-start",
					id: part.toolCallId,
					toolName: part.toolName,
					...part.providerExecuted ? { providerExecuted: part.providerExecuted } : {}
				});
				controller.enqueue({
					type: "tool-input-delta",
					id: part.toolCallId,
					delta: part.input
				});
				controller.enqueue({
					type: "tool-input-end",
					id: part.toolCallId
				});
				controller.enqueue({
					type: "tool-call",
					toolCallId: part.toolCallId,
					toolName: part.toolName,
					input: part.input,
					...part.providerExecuted ? { providerExecuted: part.providerExecuted } : {},
					...providerMetadata2 ? { providerMetadata: providerMetadata2 } : {}
				});
				break;
			}
			case "tool-result":
				controller.enqueue({
					type: "tool-result",
					toolCallId: part.toolCallId,
					toolName: part.toolName,
					result: part.result
				});
				break;
			case "source":
			case "file": controller.enqueue(part);
		}
		const serviceTier = (_c = response.service_tier) != null ? _c : headerServiceTier;
		const finishReason = {
			unified: mapGoogleInteractionsFinishReason({
				status: response.status,
				hasFunctionCall
			}),
			raw: response.status
		};
		const providerMetadata = { google: {
			...interactionId != null ? { interactionId } : {},
			...serviceTier != null ? { serviceTier } : {}
		} };
		controller.enqueue({
			type: "finish",
			finishReason,
			usage: convertGoogleInteractionsUsage(response.usage),
			providerMetadata
		});
		controller.close();
	} });
}
var GoogleInteractionsLanguageModel = class _GoogleInteractionsLanguageModel {
	constructor(modelOrAgent, config) {
		this.specificationVersion = "v4";
		if (typeof modelOrAgent === "string") {
			this.modelId = modelOrAgent;
			this.agent = void 0;
		} else if ("managedAgent" in modelOrAgent) {
			this.modelId = modelOrAgent.managedAgent;
			this.agent = modelOrAgent.managedAgent;
		} else {
			this.modelId = modelOrAgent.agent;
			this.agent = modelOrAgent.agent;
		}
		this.config = config;
	}
	static [WORKFLOW_SERIALIZE](model) {
		return {
			...serializeModelOptions({
				modelId: model.modelId,
				config: model.config
			}),
			agent: model.agent
		};
	}
	static [WORKFLOW_DESERIALIZE](options) {
		return new _GoogleInteractionsLanguageModel(options.agent != null ? { agent: options.agent } : options.modelId, options.config);
	}
	get provider() {
		return this.config.provider;
	}
	get supportedUrls() {
		if (this.config.supportedUrls) return this.config.supportedUrls();
		return {
			"image/*": [/^https?:\/\/.+/],
			"application/pdf": [/^https?:\/\/.+/],
			"audio/*": [/^https?:\/\/.+/],
			"video/*": [
				/^https?:\/\/(www\.)?youtube\.com\/watch\?v=.+/,
				/^https?:\/\/youtu\.be\/.+/,
				/^gs:\/\/.+/
			]
		};
	}
	async getArgs(options) {
		var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A;
		const warnings = [];
		const googleOptions = await parseProviderOptions({
			provider: "google",
			providerOptions: options.providerOptions,
			schema: googleInteractionsLanguageModelOptions
		});
		const isAgent = this.agent != null;
		if (!isAgent) {
			if (options.frequencyPenalty != null) warnings.push({
				type: "unsupported",
				feature: "frequencyPenalty"
			});
			if (options.presencePenalty != null) warnings.push({
				type: "unsupported",
				feature: "presencePenalty"
			});
		}
		const hasTools = options.tools != null && options.tools.length > 0;
		let toolsForBody;
		let toolChoiceForBody;
		if (hasTools) {
			const prepared = prepareGoogleInteractionsTools({
				tools: options.tools,
				toolChoice: options.toolChoice
			});
			toolsForBody = prepared.tools;
			toolChoiceForBody = prepared.toolChoice;
			warnings.push(...prepared.toolWarnings);
		}
		const responseFormatEntries = [];
		if (((_a = options.responseFormat) == null ? void 0 : _a.type) === "json") if (isAgent) warnings.push({
			type: "other",
			message: "google.interactions: structured output (responseFormat) is not supported when an agent is set; responseFormat will be ignored."
		});
		else {
			const entry = {
				type: "text",
				mime_type: "application/json",
				...options.responseFormat.schema != null ? { schema: options.responseFormat.schema } : {}
			};
			responseFormatEntries.push(entry);
		}
		if ((googleOptions == null ? void 0 : googleOptions.responseFormat) != null) {
			for (const entry of googleOptions.responseFormat) if (entry.type === "text") responseFormatEntries.push(pruneUndefined({
				type: "text",
				mime_type: (_b = entry.mimeType) != null ? _b : void 0,
				schema: (_c = entry.schema) != null ? _c : void 0
			}));
			else if (entry.type === "image") responseFormatEntries.push(pruneUndefined({
				type: "image",
				mime_type: (_d = entry.mimeType) != null ? _d : void 0,
				aspect_ratio: (_e = entry.aspectRatio) != null ? _e : void 0,
				image_size: (_f = entry.imageSize) != null ? _f : void 0
			}));
			else if (entry.type === "audio") responseFormatEntries.push(pruneUndefined({
				type: "audio",
				mime_type: (_g = entry.mimeType) != null ? _g : void 0
			}));
		}
		const { input, systemInstruction: convertedSystemInstruction, warnings: convWarnings } = convertToGoogleInteractionsInput({
			prompt: options.prompt,
			previousInteractionId: (_h = googleOptions == null ? void 0 : googleOptions.previousInteractionId) != null ? _h : void 0,
			store: (_i = googleOptions == null ? void 0 : googleOptions.store) != null ? _i : void 0,
			mediaResolution: (_j = googleOptions == null ? void 0 : googleOptions.mediaResolution) != null ? _j : void 0
		});
		warnings.push(...convWarnings);
		let systemInstruction = convertedSystemInstruction;
		const optionSystemInstruction = (_k = googleOptions == null ? void 0 : googleOptions.systemInstruction) != null ? _k : void 0;
		if (systemInstruction != null && optionSystemInstruction != null) warnings.push({
			type: "other",
			message: "google.interactions: both AI SDK system message and providerOptions.google.systemInstruction were set; using the AI SDK system message."
		});
		else if (systemInstruction == null && optionSystemInstruction != null) systemInstruction = optionSystemInstruction;
		let generationConfig;
		if (isAgent) {
			const droppedFields = [];
			if (options.temperature != null) droppedFields.push("temperature");
			if (options.topP != null) droppedFields.push("topP");
			if (options.topK != null) droppedFields.push("topK");
			if (options.frequencyPenalty != null) droppedFields.push("frequencyPenalty");
			if (options.presencePenalty != null) droppedFields.push("presencePenalty");
			if (options.seed != null) droppedFields.push("seed");
			if (options.stopSequences != null && options.stopSequences.length > 0) droppedFields.push("stopSequences");
			if (options.maxOutputTokens != null) droppedFields.push("maxOutputTokens");
			if ((googleOptions == null ? void 0 : googleOptions.thinkingLevel) != null) droppedFields.push("thinkingLevel");
			if ((googleOptions == null ? void 0 : googleOptions.thinkingSummaries) != null) droppedFields.push("thinkingSummaries");
			if ((googleOptions == null ? void 0 : googleOptions.imageConfig) != null) droppedFields.push("imageConfig");
			if (droppedFields.length > 0) warnings.push({
				type: "other",
				message: `google.interactions: ${droppedFields.join(", ")} ${droppedFields.length === 1 ? "is" : "are"} not supported when an agent is set; use providerOptions.google.agentConfig instead. Dropped from the request body.`
			});
			generationConfig = void 0;
		} else {
			generationConfig = pruneUndefined({
				temperature: (_l = options.temperature) != null ? _l : void 0,
				top_p: (_m = options.topP) != null ? _m : void 0,
				top_k: (_n = options.topK) != null ? _n : void 0,
				seed: (_o = options.seed) != null ? _o : void 0,
				stop_sequences: options.stopSequences != null && options.stopSequences.length > 0 ? options.stopSequences : void 0,
				max_output_tokens: (_p = options.maxOutputTokens) != null ? _p : void 0,
				thinking_level: (_q = googleOptions == null ? void 0 : googleOptions.thinkingLevel) != null ? _q : void 0,
				thinking_summaries: (_r = googleOptions == null ? void 0 : googleOptions.thinkingSummaries) != null ? _r : void 0,
				tool_choice: toolChoiceForBody
			});
			if ((googleOptions == null ? void 0 : googleOptions.imageConfig) != null) {
				const alreadyHasImageEntry = responseFormatEntries.some((entry) => entry.type === "image");
				warnings.push({
					type: "other",
					message: alreadyHasImageEntry ? "google.interactions: providerOptions.google.imageConfig is deprecated and was ignored because providerOptions.google.responseFormat already supplies an image entry. Use responseFormat exclusively." : "google.interactions: providerOptions.google.imageConfig is deprecated. Use providerOptions.google.responseFormat with a { type: \"image\", ... } entry instead."
				});
				if (!alreadyHasImageEntry) responseFormatEntries.push({
					type: "image",
					mime_type: "image/png",
					...googleOptions.imageConfig.aspectRatio != null ? { aspect_ratio: googleOptions.imageConfig.aspectRatio } : {},
					...googleOptions.imageConfig.imageSize != null ? { image_size: googleOptions.imageConfig.imageSize } : {}
				});
			}
		}
		let agentConfig;
		if (isAgent && (googleOptions == null ? void 0 : googleOptions.agentConfig) != null) {
			const agentConfigOptions = googleOptions.agentConfig;
			if (agentConfigOptions.type === "deep-research") agentConfig = pruneUndefined({
				type: "deep-research",
				thinking_summaries: (_s = agentConfigOptions.thinkingSummaries) != null ? _s : void 0,
				visualization: (_t = agentConfigOptions.visualization) != null ? _t : void 0,
				collaborative_planning: (_u = agentConfigOptions.collaborativePlanning) != null ? _u : void 0
			});
			else if (agentConfigOptions.type === "dynamic") agentConfig = { type: "dynamic" };
		}
		let environment;
		if ((googleOptions == null ? void 0 : googleOptions.environment) != null) if (!isAgent) warnings.push({
			type: "other",
			message: "google.interactions: environment is only supported when an agent is set; environment will be omitted from the request body."
		});
		else if (typeof googleOptions.environment === "string") environment = googleOptions.environment;
		else {
			const environmentOptions = googleOptions.environment;
			const sources = (_v = environmentOptions.sources) == null ? void 0 : _v.map((source) => {
				var _a2;
				if (source.type === "inline") return {
					type: "inline",
					content: source.content,
					target: source.target
				};
				return pruneUndefined({
					type: source.type,
					source: source.source,
					target: (_a2 = source.target) != null ? _a2 : void 0
				});
			});
			let network;
			if (environmentOptions.network === "disabled") network = "disabled";
			else if (environmentOptions.network != null) network = { allowlist: environmentOptions.network.allowlist.map((entry) => {
				var _a2;
				return pruneUndefined({
					domain: entry.domain,
					transform: (_a2 = entry.transform) != null ? _a2 : void 0
				});
			}) };
			environment = pruneUndefined({
				type: "remote",
				sources: sources != null && sources.length > 0 ? sources : void 0,
				network
			});
		}
		return {
			args: pruneUndefined({
				...isAgent ? { agent: this.agent } : { model: this.modelId },
				input,
				system_instruction: systemInstruction,
				tools: toolsForBody,
				response_format: responseFormatEntries.length > 0 ? responseFormatEntries : void 0,
				response_modalities: (googleOptions == null ? void 0 : googleOptions.responseModalities) != null ? googleOptions.responseModalities : void 0,
				previous_interaction_id: (_w = googleOptions == null ? void 0 : googleOptions.previousInteractionId) != null ? _w : void 0,
				service_tier: (_x = googleOptions == null ? void 0 : googleOptions.serviceTier) != null ? _x : void 0,
				store: (_y = googleOptions == null ? void 0 : googleOptions.store) != null ? _y : void 0,
				generation_config: generationConfig != null && Object.keys(generationConfig).length > 0 ? generationConfig : void 0,
				agent_config: agentConfig,
				environment,
				background: (_z = googleOptions == null ? void 0 : googleOptions.background) != null ? _z : void 0
			}),
			warnings,
			isAgent,
			isBackground: (googleOptions == null ? void 0 : googleOptions.background) === true,
			pollingTimeoutMs: (_A = googleOptions == null ? void 0 : googleOptions.pollingTimeoutMs) != null ? _A : void 0
		};
	}
	async doGenerate(options) {
		var _a, _b, _c, _d, _e, _f;
		const { args, warnings, isAgent, pollingTimeoutMs } = await this.getArgs(options);
		const url = `${this.config.baseURL}/interactions`;
		const mergedHeaders = combineHeaders(this.config.headers ? await resolve(this.config.headers) : void 0, options.headers);
		let { responseHeaders, value: response, rawValue: rawResponse } = await postJsonToApi({
			url,
			headers: mergedHeaders,
			body: args,
			failedResponseHandler: googleFailedResponseHandler,
			successfulResponseHandler: createJsonResponseHandler(googleInteractionsResponseSchema),
			abortSignal: options.abortSignal,
			fetch: this.config.fetch
		});
		if (isAgent && !isTerminalStatus(response.status)) {
			const polled = await pollGoogleInteractionUntilTerminal({
				baseURL: this.config.baseURL,
				interactionId: response.id,
				headers: mergedHeaders,
				fetch: this.config.fetch,
				abortSignal: options.abortSignal,
				timeoutMs: pollingTimeoutMs
			});
			response = polled.response;
			rawResponse = polled.rawResponse;
			responseHeaders = (_a = polled.responseHeaders) != null ? _a : responseHeaders;
		}
		const interactionId = typeof response.id === "string" && response.id.length > 0 ? response.id : void 0;
		const { content, hasFunctionCall } = parseGoogleInteractionsOutputs({
			steps: (_b = response.steps) != null ? _b : null,
			generateId: (_c = this.config.generateId) != null ? _c : generateId,
			interactionId
		});
		const finishReason = {
			unified: mapGoogleInteractionsFinishReason({
				status: response.status,
				hasFunctionCall
			}),
			raw: response.status
		};
		const serviceTier = (_e = (_d = response.service_tier) != null ? _d : responseHeaders == null ? void 0 : responseHeaders["x-gemini-service-tier"]) != null ? _e : void 0;
		const outputTokensByModality = getGoogleInteractionsOutputTokensByModality(response.usage);
		const providerMetadata = { google: {
			...interactionId != null ? { interactionId } : {},
			...serviceTier != null ? { serviceTier } : {},
			...outputTokensByModality != null ? { outputTokensByModality } : {}
		} };
		let timestamp;
		if (typeof response.created === "string") {
			const parsed = new Date(response.created);
			if (!Number.isNaN(parsed.getTime())) timestamp = parsed;
		}
		return {
			content,
			finishReason,
			usage: convertGoogleInteractionsUsage(response.usage),
			warnings,
			providerMetadata,
			request: { body: args },
			response: {
				headers: responseHeaders,
				body: rawResponse,
				...interactionId != null ? { id: interactionId } : {},
				...timestamp ? { timestamp } : {},
				modelId: (_f = response.model) != null ? _f : void 0
			}
		};
	}
	async doStream(options) {
		var _a;
		const { args, warnings, isBackground, pollingTimeoutMs } = await this.getArgs(options);
		const url = `${this.config.baseURL}/interactions`;
		const mergedHeaders = combineHeaders(this.config.headers ? await resolve(this.config.headers) : void 0, options.headers);
		if (isBackground) return this.doStreamBackground({
			args,
			warnings,
			url,
			mergedHeaders,
			options,
			pollingTimeoutMs
		});
		const body = {
			...args,
			stream: true
		};
		const { responseHeaders, value: response } = await postJsonToApi({
			url,
			headers: mergedHeaders,
			body,
			failedResponseHandler: googleFailedResponseHandler,
			successfulResponseHandler: createEventSourceResponseHandler(googleInteractionsEventSchema),
			abortSignal: options.abortSignal,
			fetch: this.config.fetch
		});
		const headerServiceTier = responseHeaders == null ? void 0 : responseHeaders["x-gemini-service-tier"];
		const transform = buildGoogleInteractionsStreamTransform({
			warnings,
			generateId: (_a = this.config.generateId) != null ? _a : generateId,
			includeRawChunks: options.includeRawChunks,
			serviceTier: headerServiceTier
		});
		return {
			stream: response.pipeThrough(transform),
			request: { body },
			response: { headers: responseHeaders }
		};
	}
	async doStreamBackground({ args, warnings, url, mergedHeaders, options, pollingTimeoutMs }) {
		var _a, _b;
		const { responseHeaders: postHeaders, value: postResponse } = await postJsonToApi({
			url,
			headers: mergedHeaders,
			body: args,
			failedResponseHandler: googleFailedResponseHandler,
			successfulResponseHandler: createJsonResponseHandler(googleInteractionsResponseSchema),
			abortSignal: options.abortSignal,
			fetch: this.config.fetch
		});
		const interactionId = postResponse.id;
		if (interactionId == null || interactionId.length === 0) throw new Error("google.interactions: background POST response did not include an interaction id; cannot stream the result.");
		const headerServiceTier = postHeaders == null ? void 0 : postHeaders["x-gemini-service-tier"];
		if (isTerminalStatus(postResponse.status)) return {
			stream: synthesizeGoogleInteractionsAgentStream({
				response: postResponse,
				warnings,
				generateId: (_a = this.config.generateId) != null ? _a : generateId,
				includeRawChunks: options.includeRawChunks,
				headerServiceTier
			}),
			request: { body: args },
			response: { headers: postHeaders }
		};
		const events = streamGoogleInteractionEvents({
			baseURL: this.config.baseURL,
			interactionId,
			headers: mergedHeaders,
			fetch: this.config.fetch,
			abortSignal: options.abortSignal
		});
		const transform = buildGoogleInteractionsStreamTransform({
			warnings,
			generateId: (_b = this.config.generateId) != null ? _b : generateId,
			includeRawChunks: options.includeRawChunks,
			serviceTier: headerServiceTier
		});
		return {
			stream: events.pipeThrough(transform),
			request: { body: args },
			response: { headers: postHeaders }
		};
	}
};
function pruneUndefined(obj) {
	const result = {};
	for (const [key, value] of Object.entries(obj)) {
		if (value === void 0) continue;
		result[key] = value;
	}
	return result;
}
function getRealtimeBaseURL(baseURL) {
	const url = new URL(baseURL);
	const pathSegments = url.pathname.split("/");
	const version = pathSegments.at(-1);
	if (version === "v1beta" || version === "v1alpha") {
		pathSegments.pop();
		url.pathname = pathSegments.join("/") || "/";
	}
	return url;
}
function getRealtimeWebSocketURL(baseURL, webSocketPath) {
	const url = getRealtimeBaseURL(baseURL);
	url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
	url.pathname = `${url.pathname.replace(/\/$/, "")}/ws/${webSocketPath}`;
	return url;
}
var GoogleRealtimeEventMapper = class {
	constructor() {
		this.turnCounter = 0;
		this.hasAudio = false;
		this.hasText = false;
		this.hasTranscript = false;
		this.turnClosed = false;
		this.inputAudioRate = 16e3;
	}
	get responseId() {
		return `google-resp-${this.turnCounter}`;
	}
	get itemId() {
		return `google-item-${this.turnCounter}`;
	}
	/**
	* Rolls over to the next turn lazily, only once new model content actually
	* arrives. `turnComplete` merely marks the current turn closed; the counter
	* is not advanced until the next response begins. This keeps a transcript
	* that arrives shortly after `turnComplete` attached to the turn it belongs
	* to, since Google delivers transcription independently with no guaranteed
	* ordering relative to `turnComplete`.
	*/
	beginTurnIfClosed() {
		if (!this.turnClosed) return;
		this.turnCounter++;
		this.hasAudio = false;
		this.hasText = false;
		this.hasTranscript = false;
		this.turnClosed = false;
	}
	parseServerEvent(raw) {
		var _a, _b;
		const data = raw;
		if (data.setupComplete != null) return {
			type: "session-created",
			raw
		};
		if (data.toolCall != null) {
			this.beginTurnIfClosed();
			return ((_a = data.toolCall.functionCalls) != null ? _a : []).flatMap((functionCall) => {
				var _a2;
				const args = JSON.stringify((_a2 = functionCall.args) != null ? _a2 : {});
				return [{
					type: "function-call-arguments-delta",
					responseId: this.responseId,
					itemId: this.itemId,
					callId: functionCall.id,
					delta: args,
					raw
				}, {
					type: "function-call-arguments-done",
					responseId: this.responseId,
					itemId: this.itemId,
					callId: functionCall.id,
					name: functionCall.name,
					arguments: args,
					raw
				}];
			});
		}
		if (data.toolCallCancellation != null) return {
			type: "custom",
			rawType: "toolCallCancellation",
			raw
		};
		if (data.goAway != null) return {
			type: "custom",
			rawType: "goAway",
			raw
		};
		if (data.sessionResumptionUpdate != null) return {
			type: "custom",
			rawType: "sessionResumptionUpdate",
			raw
		};
		if (data.serverContent != null) return this.parseServerContent(data.serverContent, raw);
		if (((_b = data.inputTranscription) == null ? void 0 : _b.text) != null) return {
			type: "input-transcription-completed",
			itemId: `google-input-${this.turnCounter}`,
			transcript: data.inputTranscription.text,
			raw
		};
		return {
			type: "custom",
			rawType: String(Object.keys(data)[0]),
			raw
		};
	}
	parseServerContent(serverContent, raw) {
		var _a, _b, _c, _d;
		const events = [];
		if (serverContent.interrupted) events.push({
			type: "speech-started",
			raw
		});
		if ((_a = serverContent.modelTurn) == null ? void 0 : _a.parts) {
			this.beginTurnIfClosed();
			for (const part of serverContent.modelTurn.parts) {
				if ((_b = part.inlineData) == null ? void 0 : _b.data) {
					this.hasAudio = true;
					events.push({
						type: "audio-delta",
						responseId: this.responseId,
						itemId: this.itemId,
						delta: part.inlineData.data,
						raw
					});
				}
				if (part.text) {
					this.hasText = true;
					events.push({
						type: "text-delta",
						responseId: this.responseId,
						itemId: this.itemId,
						delta: part.text,
						raw
					});
				}
			}
		}
		if ((_c = serverContent.outputTranscription) == null ? void 0 : _c.text) {
			this.hasTranscript = true;
			events.push({
				type: "audio-transcript-delta",
				responseId: this.responseId,
				itemId: this.itemId,
				delta: serverContent.outputTranscription.text,
				raw
			});
		}
		if ((_d = serverContent.inputTranscription) == null ? void 0 : _d.text) events.push({
			type: "input-transcription-completed",
			itemId: `google-input-${this.turnCounter}`,
			transcript: serverContent.inputTranscription.text,
			raw
		});
		if (serverContent.generationComplete) events.push({
			type: "custom",
			rawType: "generationComplete",
			raw
		});
		if (serverContent.turnComplete) {
			if (this.hasAudio) events.push({
				type: "audio-done",
				responseId: this.responseId,
				itemId: this.itemId,
				raw
			});
			if (this.hasText) events.push({
				type: "text-done",
				responseId: this.responseId,
				itemId: this.itemId,
				raw
			});
			if (this.hasTranscript) events.push({
				type: "audio-transcript-done",
				responseId: this.responseId,
				itemId: this.itemId,
				raw
			});
			events.push({
				type: "response-done",
				responseId: this.responseId,
				status: "completed",
				raw
			});
			this.turnClosed = true;
		}
		if (events.length === 0) return {
			type: "custom",
			rawType: "serverContent",
			raw
		};
		return events.length === 1 ? events[0] : events;
	}
	serializeClientEvent(event, modelId) {
		var _a;
		switch (event.type) {
			case "session-update":
				if (((_a = event.config.inputAudioFormat) == null ? void 0 : _a.rate) != null) this.inputAudioRate = event.config.inputAudioFormat.rate;
				return { setup: buildGoogleSessionConfig(event.config, modelId) };
			case "input-audio-append": return { realtimeInput: { audio: {
				data: event.audio,
				mimeType: `audio/pcm;rate=${this.inputAudioRate}`
			} } };
			case "input-audio-commit": return { realtimeInput: { audioStreamEnd: true } };
			case "input-audio-clear":
			case "response-create":
			case "response-cancel":
			case "conversation-item-truncate": return null;
			case "conversation-item-create": {
				const item = event.item;
				switch (item.type) {
					case "text-message": return { realtimeInput: { text: item.text } };
					case "function-call-output": return serializeFunctionCallOutput(item);
					case "audio-message": return null;
				}
				break;
			}
		}
		return null;
	}
};
async function serializeFunctionCallOutput(item) {
	const parseResult = await safeParseJSON({ text: item.output });
	const response = parseResult.success ? parseResult.value : {};
	return { toolResponse: { functionResponses: [{
		id: item.callId,
		name: item.name,
		response
	}] } };
}
function buildGoogleSessionConfig(config, modelId) {
	const setup = { model: getModelPath(modelId) };
	const generationConfig = {};
	if ((config == null ? void 0 : config.outputModalities) != null) generationConfig.responseModalities = config.outputModalities.map((m) => m.toUpperCase());
	else generationConfig.responseModalities = ["AUDIO"];
	if ((config == null ? void 0 : config.voice) != null) generationConfig.speechConfig = { voiceConfig: { prebuiltVoiceConfig: { voiceName: config.voice } } };
	setup.generationConfig = generationConfig;
	if ((config == null ? void 0 : config.instructions) != null) setup.systemInstruction = { parts: [{ text: config.instructions }] };
	if ((config == null ? void 0 : config.tools) != null && config.tools.length > 0) setup.tools = [{ functionDeclarations: config.tools.map((tool) => ({
		name: tool.name,
		description: tool.description,
		parameters: convertJSONSchemaToOpenAPISchema(tool.parameters)
	})) }];
	if ((config == null ? void 0 : config.inputAudioTranscription) != null) setup.inputAudioTranscription = {};
	if ((config == null ? void 0 : config.outputAudioTranscription) != null) setup.outputAudioTranscription = {};
	if ((config == null ? void 0 : config.providerOptions) == null) return setup;
	const { google: google2, ...providerOptions } = config.providerOptions;
	Object.assign(setup, providerOptions);
	const googleOptions = isRecord(google2) ? google2 : void 0;
	if ((googleOptions == null ? void 0 : googleOptions.translationConfig) != null) setup.generationConfig = {
		...isRecord(setup.generationConfig) ? setup.generationConfig : generationConfig,
		translationConfig: googleOptions.translationConfig
	};
	return setup;
}
var realtimeWebSocketPath = "google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContentConstrained";
function getAuthTokensURL(baseURL) {
	const url = getRealtimeBaseURL(baseURL);
	url.pathname = `${url.pathname.replace(/\/$/, "")}/v1alpha/auth_tokens`;
	return url.toString();
}
function getWebSocketURL(baseURL) {
	return getRealtimeWebSocketURL(baseURL, realtimeWebSocketPath).toString();
}
var GoogleRealtimeModel = class {
	constructor(modelId, config) {
		this.specificationVersion = "v4";
		this.mapper = new GoogleRealtimeEventMapper();
		this.modelId = modelId;
		this.provider = config.provider;
		this.config = config;
	}
	async doCreateClientSecret(options) {
		var _a, _b;
		const fetchFn = (_a = this.config.fetch) != null ? _a : fetch;
		const apiKey = this.config.headers()["x-goog-api-key"];
		if (!apiKey) throw new Error("Google Generative AI API key is required for realtime token creation.");
		const now = Date.now();
		const openWindowMs = ((_b = options.expiresAfterSeconds) != null ? _b : 60) * 1e3;
		const newSessionExpireTime = new Date(now + openWindowMs).toISOString();
		const expireTime = new Date(now + openWindowMs + 18e5).toISOString();
		const setupPayload = buildGoogleSessionConfig(options.sessionConfig, this.modelId);
		const response = await fetchFn(`${getAuthTokensURL(this.config.baseURL)}?key=${encodeURIComponent(apiKey)}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				uses: 0,
				expireTime,
				newSessionExpireTime,
				bidiGenerateContentSetup: setupPayload
			})
		});
		if (!response.ok) {
			const text = await response.text();
			throw new Error(`Google realtime auth token request failed: ${response.status} ${text}`);
		}
		const data = await response.json();
		return {
			token: data.name,
			url: getWebSocketURL(this.config.baseURL),
			expiresAt: data.expireTime ? Math.floor(new Date(data.expireTime).getTime() / 1e3) : void 0
		};
	}
	getWebSocketConfig(options) {
		return { url: `${options.url}?access_token=${encodeURIComponent(options.token)}` };
	}
	parseServerEvent(raw) {
		return this.mapper.parseServerEvent(raw);
	}
	serializeClientEvent(event) {
		return this.mapper.serializeClientEvent(event, this.modelId);
	}
	buildSessionConfig(config) {
		return buildGoogleSessionConfig(config, this.modelId);
	}
};
var googleTranscriptionModelOptions = object({
	/**
	* BCP-47 language codes providing hints about the languages present in the
	* audio. If omitted or empty, defaults to automatic language detection.
	*/
	languageCodes: array(string()).optional(),
	/**
	* Custom vocabulary phrases, which bias the speech recognition model
	* toward recognizing specific terms.
	*/
	customVocabulary: array(string()).optional(),
	/**
	* Enables word-level timestamp generation.
	*/
	wordTimestamp: boolean().optional(),
	/**
	* Enables speaker diarization.
	*/
	diarization: boolean().optional(),
	/**
	* Transcription output formatting mode.
	*
	* - `VERBATIM` (default): exact literal transcript preserving filler
	*   words, repetitions, and false starts.
	* - `SMART`: cleans up and structures the transcript in real time —
	*   disfluency removal, inline self-corrections, structured formatting
	*   (lists, numbers, dates, paragraph breaks), and grammar/casing polish.
	*/
	mode: _enum(["SMART", "VERBATIM"]).optional()
});
var liveWebSocketPath = "google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent";
var defaultFinishGraceMs = 3e3;
function getLiveWebSocketURL(baseURL, apiKey) {
	const url = getRealtimeWebSocketURL(baseURL, liveWebSocketPath);
	url.searchParams.set("key", apiKey);
	return url;
}
function isLiveTranscriptionModelId(modelId) {
	return modelId.includes("-live");
}
var GoogleTranscriptionModel = class _GoogleTranscriptionModel {
	constructor(modelId, config) {
		this.modelId = modelId;
		this.config = config;
		this.specificationVersion = "v4";
	}
	static [WORKFLOW_SERIALIZE](model) {
		return serializeModelOptions({
			modelId: model.modelId,
			config: model.config
		});
	}
	static [WORKFLOW_DESERIALIZE](options) {
		return new _GoogleTranscriptionModel(options.modelId, options.config);
	}
	get provider() {
		return this.config.provider;
	}
	async parseOptions(providerOptions) {
		return parseProviderOptions({
			provider: "google",
			providerOptions,
			schema: googleTranscriptionModelOptions
		});
	}
	async doGenerate(options) {
		var _a, _b, _c, _d, _e, _f;
		if (isLiveTranscriptionModelId(this.modelId)) throw new InvalidArgumentError({
			argument: "modelId",
			message: `Model '${this.modelId}' only supports streaming transcription. Use experimental_streamTranscribe, or a unary model such as 'gemini-3.5-transcribe'.`
		});
		const currentDate = (_c = (_b = (_a = this.config._internal) == null ? void 0 : _a.currentDate) == null ? void 0 : _b.call(_a)) != null ? _c : /* @__PURE__ */ new Date();
		const warnings = [];
		const transcriptionConfig = buildTranscriptionConfig(await this.parseOptions(options.providerOptions));
		const requestBody = {
			model: this.modelId,
			input: [{
				type: "audio",
				data: convertToBase64(options.audio),
				mime_type: options.mediaType
			}],
			...transcriptionConfig != null ? { generation_config: { transcription_config: transcriptionConfig } } : {}
		};
		const { value: response, responseHeaders, rawValue: rawResponse } = await postJsonToApi({
			url: `${this.config.baseURL}/interactions`,
			headers: combineHeaders(this.config.headers ? await resolve(this.config.headers) : void 0, options.headers),
			body: requestBody,
			failedResponseHandler: googleFailedResponseHandler,
			successfulResponseHandler: createJsonResponseHandler(googleInteractionsTranscriptionResponseSchema),
			abortSignal: options.abortSignal,
			fetch: this.config.fetch
		});
		let text = "";
		const segments = [];
		for (const step of (_d = response.steps) != null ? _d : []) for (const content of (_e = step.content) != null ? _e : []) {
			if (content.type !== "text" || content.text == null) continue;
			text += content.text;
			for (const annotation of (_f = content.annotations) != null ? _f : []) {
				if (annotation.type !== "word_info") continue;
				const startSecond = parseOffsetSeconds(annotation.start_offset);
				const endSecond = parseOffsetSeconds(annotation.end_offset);
				if (annotation.text == null || startSecond == null || endSecond == null) continue;
				segments.push({
					text: annotation.text,
					startSecond,
					endSecond
				});
			}
		}
		return {
			text,
			segments,
			language: void 0,
			durationInSeconds: void 0,
			warnings,
			response: {
				timestamp: currentDate,
				modelId: this.modelId,
				headers: responseHeaders,
				body: rawResponse
			},
			...response.usage != null ? { providerMetadata: { google: { usage: response.usage } } } : {}
		};
	}
	async doStream(options) {
		var _a, _b, _c, _d, _e, _f, _g;
		if (!isLiveTranscriptionModelId(this.modelId)) throw new InvalidArgumentError({
			argument: "modelId",
			message: `Model '${this.modelId}' does not support streaming transcription. Use a live model such as 'gemini-3.5-transcribe-live'.`
		});
		const currentDate = (_c = (_b = (_a = this.config._internal) == null ? void 0 : _a.currentDate) == null ? void 0 : _b.call(_a)) != null ? _c : /* @__PURE__ */ new Date();
		const warnings = [];
		const googleOptions = await this.parseOptions(options.providerOptions);
		validateLiveInputAudioFormat(options.inputAudioFormat);
		const headers = combineHeaders(this.config.headers ? await resolve(this.config.headers) : void 0, options.headers);
		let apiKey;
		for (const [key, value] of Object.entries(headers)) if (key.toLowerCase() === "x-goog-api-key" && value != null) apiKey = value;
		if (apiKey == null) throw new Error("Google Generative AI API key is required for streaming transcription.");
		const webSocketHeaders = Object.fromEntries(Object.entries(headers).filter(([key]) => key.toLowerCase() !== "x-goog-api-key"));
		const setup = {
			model: getModelPath(this.modelId),
			inputAudioTranscription: (_d = buildAudioTranscriptionConfig(googleOptions)) != null ? _d : {}
		};
		return {
			request: { body: setup },
			response: {
				timestamp: currentDate,
				modelId: this.modelId
			},
			stream: createGoogleLiveTranscriptionStream({
				webSocket: this.config.webSocket,
				url: getLiveWebSocketURL(this.config.baseURL, apiKey),
				headers: webSocketHeaders,
				setup,
				inputAudioRate: (_e = options.inputAudioFormat.rate) != null ? _e : 16e3,
				finishGraceMs: (_g = (_f = this.config._internal) == null ? void 0 : _f.finishGraceMs) != null ? _g : defaultFinishGraceMs,
				warnings,
				audio: options.audio,
				abortSignal: options.abortSignal,
				includeRawChunks: options.includeRawChunks
			})
		};
	}
};
function createGoogleLiveTranscriptionStream({ webSocket, url, headers, setup, inputAudioRate, finishGraceMs, warnings, audio, abortSignal, includeRawChunks }) {
	let finished = false;
	let cleanup = () => {};
	return new ReadableStream({
		start: (controller) => {
			let audioReader;
			let connection;
			let resolveSetupComplete;
			const setupComplete = new Promise((resolve8) => {
				resolveSetupComplete = resolve8;
			});
			let segmentCounter = 0;
			let segmentBuffer = "";
			let fullText = "";
			let latestInterim = "";
			let language;
			let audioEnded = false;
			let usageMetadata;
			let finishTimer;
			const segmentId = () => `google-segment-${segmentCounter}`;
			const cancelPendingFinish = () => {
				if (finishTimer != null) {
					clearTimeout(finishTimer);
					finishTimer = void 0;
				}
			};
			const schedulePendingFinish = () => {
				if (finished || !audioEnded) return;
				cancelPendingFinish();
				finishTimer = setTimeout(() => {
					finishTimer = void 0;
					finish();
				}, finishGraceMs);
			};
			cleanup = (closeCode) => {
				cancelPendingFinish();
				if (audioReader != null) audioReader.cancel().catch(() => {});
				else audio.cancel().catch(() => {});
				connection?.close(closeCode);
			};
			const finishWithError = (error) => {
				if (finished) return;
				finished = true;
				cleanup();
				controller.error(error);
			};
			const completeSegment = () => {
				if (segmentBuffer === "") {
					if (latestInterim === "") return;
					segmentBuffer = latestInterim;
				}
				latestInterim = "";
				controller.enqueue({
					type: "transcript-final",
					id: segmentId(),
					text: segmentBuffer
				});
				fullText += fullText === "" ? segmentBuffer : ` ${segmentBuffer}`;
				segmentBuffer = "";
				segmentCounter++;
			};
			const finish = () => {
				if (finished) return;
				completeSegment();
				finished = true;
				controller.enqueue({
					type: "finish",
					text: fullText,
					segments: [],
					language,
					durationInSeconds: void 0,
					...usageMetadata != null ? { providerMetadata: { google: { usageMetadata } } } : {}
				});
				controller.close();
				cleanup(1e3);
			};
			const sendAudio = async (socket) => {
				audioReader = audio.getReader();
				try {
					while (true) {
						const { done, value } = await audioReader.read();
						if (done || finished) break;
						socket.send(JSON.stringify({ realtimeInput: { audio: {
							data: convertToBase64(value),
							mimeType: `audio/pcm;rate=${inputAudioRate}`
						} } }));
						await waitForWebSocketBufferDrain(socket);
					}
				} finally {
					audioReader.releaseLock();
					audioReader = void 0;
				}
				if (!finished) {
					socket.send(JSON.stringify({ realtimeInput: { audioStreamEnd: true } }));
					audioEnded = true;
					schedulePendingFinish();
				}
			};
			connection = connectToWebSocket({
				url,
				headers,
				webSocket,
				abortSignal,
				onAbort: finishWithError,
				onProcessingError: finishWithError,
				onOpen: (socket) => {
					controller.enqueue({
						type: "stream-start",
						warnings
					});
					socket.send(JSON.stringify({ setup }));
					setupComplete.then(() => finished ? void 0 : sendAudio(socket)).catch(finishWithError);
				},
				onMessageText: async (text) => {
					var _a, _b;
					if (finished) return;
					const parsed = await safeParseJSON({ text });
					if (!parsed.success) return;
					const message = parsed.value;
					if (includeRawChunks) controller.enqueue({
						type: "raw",
						rawValue: message
					});
					if (message.setupComplete != null) resolveSetupComplete();
					if (message.usageMetadata != null) usageMetadata = message.usageMetadata;
					if (message.error != null) {
						finishWithError(new Error((_a = message.error.message) != null ? _a : "Google Live API error"));
						return;
					}
					const serverContent = message.serverContent;
					const interim = serverContent == null ? void 0 : serverContent.interimInputTranscription;
					if (interim == null ? void 0 : interim.text) {
						schedulePendingFinish();
						latestInterim = interim.text;
						controller.enqueue({
							type: "transcript-partial",
							id: segmentId(),
							text: interim.text
						});
					}
					const transcription = (_b = serverContent == null ? void 0 : serverContent.inputTranscription) != null ? _b : message.inputTranscription;
					if (transcription != null) {
						if (transcription.languageCode != null) language = transcription.languageCode;
						if (transcription.text) {
							schedulePendingFinish();
							latestInterim = "";
							segmentBuffer += transcription.text;
							controller.enqueue({
								type: "transcript-delta",
								id: segmentId(),
								delta: transcription.text
							});
						}
						if (transcription.finished === true) completeSegment();
					}
					if (serverContent == null ? void 0 : serverContent.turnComplete) completeSegment();
					const interactionStatus = serverContent == null ? void 0 : serverContent.interactionStatus;
					if (audioEnded && (interactionStatus === "IDLE" || interactionStatus === "REQUIRES_ACTION" || (serverContent == null ? void 0 : serverContent.turnComplete) === true && interactionStatus == null)) finish();
				},
				onSocketError: () => {
					finishWithError(/* @__PURE__ */ new Error("Google Live transcription error"));
				},
				onClose: ({ code, reason }) => {
					if (finished) return;
					if (audioEnded) {
						finish();
						return;
					}
					finishWithError(/* @__PURE__ */ new Error(`Google Live transcription WebSocket closed unexpectedly before finishing (code ${code != null ? code : "unknown"}${reason ? `, reason: ${reason}` : ""}).`));
				}
			});
		},
		cancel: () => {
			if (finished) return;
			finished = true;
			cleanup();
		}
	});
}
function buildAudioTranscriptionConfig(options) {
	if (options == null) return void 0;
	const config = {};
	if (options.languageCodes != null) config.languageCodes = options.languageCodes;
	if (options.customVocabulary != null) config.customVocabulary = options.customVocabulary;
	if (options.wordTimestamp != null) config.wordTimestamp = options.wordTimestamp;
	if (options.diarization != null) config.diarization = options.diarization;
	if (options.mode != null) config.mode = options.mode;
	return Object.keys(config).length > 0 ? config : void 0;
}
function buildTranscriptionConfig(options) {
	var _a;
	if (options == null) return void 0;
	const config = {};
	if (options.languageCodes != null) config.language_codes = options.languageCodes;
	if (options.customVocabulary != null) config.custom_vocabulary = options.customVocabulary;
	if (options.mode != null || options.diarization === true || options.wordTimestamp === true) config.mode = {
		type: ((_a = options.mode) != null ? _a : "VERBATIM").toLowerCase(),
		...options.diarization === true ? { diarization_mode: "speaker" } : {},
		...options.wordTimestamp === true ? { timestamp_granularities: ["word"] } : {}
	};
	return Object.keys(config).length > 0 ? config : void 0;
}
function parseOffsetSeconds(offset) {
	if (offset == null) return void 0;
	const parsed = Number.parseFloat(offset);
	return Number.isFinite(parsed) ? parsed : void 0;
}
function validateLiveInputAudioFormat(inputAudioFormat) {
	if (inputAudioFormat.type !== "audio/pcm" || inputAudioFormat.rate != null && inputAudioFormat.rate !== 16e3) throw new InvalidArgumentError({
		argument: "inputAudioFormat",
		message: "The Gemini Live transcription API only supports 16kHz 16-bit PCM input audio."
	});
}
var googleInteractionsWordAnnotationSchema = object({
	type: string().nullish(),
	text: string().nullish(),
	speaker: string().nullish(),
	start_offset: string().nullish(),
	end_offset: string().nullish()
});
var googleInteractionsTranscriptionResponseSchema = object({
	status: string().nullish(),
	steps: array(object({
		type: string().nullish(),
		content: array(object({
			type: string().nullish(),
			text: string().nullish(),
			annotations: array(googleInteractionsWordAnnotationSchema).nullish()
		})).nullish()
	})).nullish(),
	usage: record(string(), unknown()).nullish()
});
var googleSpeechTranslationModelOptions = lazySchema(() => zodSchema(object({ 
/**
* Whether input audio already in the target language should be echoed
* instead of producing silence.
*/
echoTargetLanguage: boolean().optional() })));
var liveWebSocketPath2 = "google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent";
var defaultFinishGraceMs2 = 1e3;
var googleLiveOutputAudioRate = 24e3;
var pcm16SilenceAmplitudeThreshold = 128;
function getLiveWebSocketURL2(baseURL, apiKey) {
	const url = getRealtimeWebSocketURL(baseURL, liveWebSocketPath2);
	url.searchParams.set("key", apiKey);
	return url;
}
var GoogleSpeechTranslationModel = class _GoogleSpeechTranslationModel {
	constructor(modelId, config) {
		this.specificationVersion = "v4";
		this.modelId = modelId;
		this.config = config;
	}
	static [WORKFLOW_SERIALIZE](model) {
		return serializeModelOptions({
			modelId: model.modelId,
			config: model.config
		});
	}
	static [WORKFLOW_DESERIALIZE](options) {
		return new _GoogleSpeechTranslationModel(options.modelId, options.config);
	}
	get provider() {
		return this.config.provider;
	}
	async doStream(options) {
		var _a, _b, _c, _d, _e, _f;
		if (options.targetLanguage == null) throw new InvalidArgumentError({
			argument: "targetLanguage",
			message: `targetLanguage is required for translation model '${this.modelId}'.`
		});
		const currentDate = (_c = (_b = (_a = this.config._internal) == null ? void 0 : _a.currentDate) == null ? void 0 : _b.call(_a)) != null ? _c : /* @__PURE__ */ new Date();
		const googleOptions = await parseProviderOptions({
			provider: "google",
			providerOptions: options.providerOptions,
			schema: googleSpeechTranslationModelOptions
		});
		const warnings = [];
		validateGoogleSpeechTranslationInputAudioFormat(options.inputAudioFormat);
		if (options.sourceLanguage != null) warnings.push({
			type: "unsupported",
			feature: "sourceLanguage",
			details: "The Gemini Live translation API auto-detects the source language and does not accept a source language."
		});
		if (options.outputAudioFormat != null) warnings.push({
			type: "unsupported",
			feature: "outputAudioFormat",
			details: "The Gemini Live API always outputs 24kHz 16-bit PCM audio and does not accept an output audio format."
		});
		const headers = combineHeaders(this.config.headers(), options.headers);
		let apiKey;
		for (const [key, value] of Object.entries(headers)) if (key.toLowerCase() === "x-goog-api-key" && value != null) apiKey = value;
		if (apiKey == null) throw new Error("Google Generative AI API key is required for streaming translation.");
		const webSocketHeaders = Object.fromEntries(Object.entries(headers).filter(([key]) => key.toLowerCase() !== "x-goog-api-key"));
		const setup = buildGoogleLiveSpeechTranslationSetup({
			modelId: this.modelId,
			targetLanguage: options.targetLanguage,
			providerOptions: googleOptions
		});
		return {
			request: { body: setup },
			response: {
				timestamp: currentDate,
				modelId: this.modelId
			},
			stream: createGoogleLiveSpeechTranslationStream({
				webSocket: this.config.webSocket,
				url: getLiveWebSocketURL2(this.config.baseURL, apiKey),
				headers: webSocketHeaders,
				setup,
				inputAudioRate: (_d = options.inputAudioFormat.rate) != null ? _d : 16e3,
				finishGraceMs: (_f = (_e = this.config._internal) == null ? void 0 : _e.finishGraceMs) != null ? _f : defaultFinishGraceMs2,
				warnings,
				audio: options.audio,
				abortSignal: options.abortSignal,
				includeRawChunks: options.includeRawChunks
			})
		};
	}
};
function createGoogleLiveSpeechTranslationStream({ webSocket, url, headers, setup, inputAudioRate, finishGraceMs, warnings, audio, abortSignal, includeRawChunks }) {
	let finished = false;
	let cleanup = () => {};
	return new ReadableStream({
		start: (controller) => {
			let audioReader;
			let connection;
			let resolveSetupComplete;
			const setupComplete = new Promise((resolve8) => {
				resolveSetupComplete = resolve8;
			});
			let turnCounter = 0;
			let sourceText = "";
			let sourceTurnBuffer = "";
			let translationText = "";
			let translationTurnBuffer = "";
			let audioEnded = false;
			let usage;
			let openTurn = false;
			let sawTurnComplete = false;
			let trailingSilenceMs = 0;
			let finishTimer;
			const itemId = () => `google-item-${turnCounter}`;
			const cancelPendingFinish = () => {
				if (finishTimer != null) {
					clearTimeout(finishTimer);
					finishTimer = void 0;
				}
			};
			const schedulePendingFinish = () => {
				if (finished || finishTimer != null) return;
				finishTimer = setTimeout(() => {
					finishTimer = void 0;
					finish();
				}, finishGraceMs);
			};
			const onTurnActivity = () => {
				openTurn = true;
				trailingSilenceMs = 0;
				cancelPendingFinish();
			};
			cleanup = (closeCode) => {
				cancelPendingFinish();
				if (audioReader != null) audioReader.cancel().catch(() => {});
				else audio.cancel().catch(() => {});
				connection?.close(closeCode);
			};
			const finishWithError = (error) => {
				if (finished) return;
				finished = true;
				cleanup();
				controller.error(error);
			};
			const finish = () => {
				if (finished) return;
				if (sourceTurnBuffer !== "" || translationTurnBuffer !== "") completeTurn();
				finished = true;
				controller.enqueue({
					type: "finish",
					sourceText,
					outputText: translationText,
					usage
				});
				controller.close();
				cleanup(1e3);
			};
			const completeTurn = () => {
				if (sourceTurnBuffer !== "") {
					controller.enqueue({
						type: "source-transcript-final",
						id: itemId(),
						text: sourceTurnBuffer
					});
					sourceText += sourceTurnBuffer;
					sourceTurnBuffer = "";
				}
				if (translationTurnBuffer !== "") {
					controller.enqueue({
						type: "output-text-final",
						id: itemId(),
						text: translationTurnBuffer
					});
					translationText += translationTurnBuffer;
					translationTurnBuffer = "";
				}
				turnCounter++;
			};
			const sendAudio = async (socket) => {
				audioReader = audio.getReader();
				try {
					while (true) {
						const { done, value } = await audioReader.read();
						if (done || finished) break;
						socket.send(JSON.stringify({ realtimeInput: { audio: {
							data: convertToBase64(value),
							mimeType: `audio/pcm;rate=${inputAudioRate}`
						} } }));
						await waitForWebSocketBufferDrain(socket);
					}
				} finally {
					audioReader.releaseLock();
					audioReader = void 0;
				}
				if (!finished) {
					socket.send(JSON.stringify({ realtimeInput: { audioStreamEnd: true } }));
					audioEnded = true;
					if (sawTurnComplete && !openTurn) schedulePendingFinish();
				}
			};
			connection = connectToWebSocket({
				url,
				headers,
				webSocket,
				abortSignal,
				onAbort: finishWithError,
				onProcessingError: finishWithError,
				onOpen: (socket) => {
					controller.enqueue({
						type: "stream-start",
						warnings
					});
					socket.send(JSON.stringify({ setup }));
					setupComplete.then(() => finished ? void 0 : sendAudio(socket)).catch(finishWithError);
				},
				onMessageText: async (text) => {
					var _a, _b, _c, _d, _e, _f, _g, _h, _i;
					if (finished) return;
					const parsed = await safeParseJSON({ text });
					if (!parsed.success) return;
					const message = parsed.value;
					if (includeRawChunks) controller.enqueue({
						type: "raw",
						rawValue: message
					});
					if (message.setupComplete != null) resolveSetupComplete();
					if (message.usageMetadata != null) usage = accumulateGoogleLiveUsage(usage, message.usageMetadata);
					if (message.error != null) {
						finishWithError(new Error((_a = message.error.message) != null ? _a : "Google Live API error"));
						return;
					}
					const inputTranscriptionText = (_e = (_c = (_b = message.serverContent) == null ? void 0 : _b.inputTranscription) == null ? void 0 : _c.text) != null ? _e : (_d = message.inputTranscription) == null ? void 0 : _d.text;
					if (inputTranscriptionText) {
						onTurnActivity();
						sourceTurnBuffer += inputTranscriptionText;
						controller.enqueue({
							type: "source-transcript-delta",
							id: itemId(),
							delta: inputTranscriptionText
						});
					}
					const serverContent = message.serverContent;
					if (serverContent == null) return;
					for (const part of (_g = (_f = serverContent.modelTurn) == null ? void 0 : _f.parts) != null ? _g : []) if ((_h = part.inlineData) == null ? void 0 : _h.data) {
						controller.enqueue({
							type: "audio",
							id: itemId(),
							audio: part.inlineData.data
						});
						const silenceDurationMs = getPcm16SilenceDurationMs(part.inlineData.data);
						if (audioEnded && silenceDurationMs != null) {
							trailingSilenceMs += silenceDurationMs;
							if (trailingSilenceMs >= finishGraceMs) {
								finish();
								return;
							}
						} else onTurnActivity();
					}
					if ((_i = serverContent.outputTranscription) == null ? void 0 : _i.text) {
						onTurnActivity();
						translationTurnBuffer += serverContent.outputTranscription.text;
						controller.enqueue({
							type: "output-text-delta",
							id: itemId(),
							delta: serverContent.outputTranscription.text
						});
					}
					if (serverContent.turnComplete) {
						completeTurn();
						openTurn = false;
						sawTurnComplete = true;
						if (audioEnded) schedulePendingFinish();
					}
				},
				onSocketError: () => {
					finishWithError(/* @__PURE__ */ new Error("Google Live translation error"));
				},
				onClose: ({ code, reason }) => {
					if (finished) return;
					if (finishTimer != null) {
						finish();
						return;
					}
					finishWithError(/* @__PURE__ */ new Error(`Google Live translation WebSocket closed unexpectedly before finishing (code ${code != null ? code : "unknown"}${reason ? `, reason: ${reason}` : ""}).`));
				}
			});
		},
		cancel: () => {
			if (finished) return;
			finished = true;
			cleanup();
		}
	});
}
function accumulateGoogleLiveUsage(usage, usageMetadata) {
	var _a, _b;
	let inputAudioTokens = usage == null ? void 0 : usage.inputAudioTokens;
	let outputAudioTokens = usage == null ? void 0 : usage.outputAudioTokens;
	for (const detail of (_a = usageMetadata.promptTokensDetails) != null ? _a : []) if (detail.modality === "AUDIO" && detail.tokenCount != null) inputAudioTokens = (inputAudioTokens != null ? inputAudioTokens : 0) + detail.tokenCount;
	for (const detail of (_b = usageMetadata.responseTokensDetails) != null ? _b : []) if (detail.modality === "AUDIO" && detail.tokenCount != null) outputAudioTokens = (outputAudioTokens != null ? outputAudioTokens : 0) + detail.tokenCount;
	if (inputAudioTokens == null && outputAudioTokens == null) return usage;
	return {
		...usage,
		...inputAudioTokens != null ? { inputAudioTokens } : {},
		...outputAudioTokens != null ? { outputAudioTokens } : {}
	};
}
function getPcm16SilenceDurationMs(audio) {
	let bytes;
	try {
		bytes = convertBase64ToUint8Array(audio);
	} catch (e) {
		return;
	}
	if (bytes.byteLength < 2) return;
	const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
	const sampleCount = Math.floor(bytes.byteLength / 2);
	for (let i = 0; i < sampleCount; i++) if (Math.abs(view.getInt16(i * 2, true)) > pcm16SilenceAmplitudeThreshold) return;
	return sampleCount / googleLiveOutputAudioRate * 1e3;
}
function buildGoogleLiveSpeechTranslationSetup({ modelId, targetLanguage, providerOptions }) {
	return {
		model: getModelPath(modelId),
		generationConfig: {
			responseModalities: ["AUDIO"],
			translationConfig: {
				targetLanguageCode: targetLanguage,
				...(providerOptions == null ? void 0 : providerOptions.echoTargetLanguage) != null ? { echoTargetLanguage: providerOptions.echoTargetLanguage } : {}
			}
		},
		inputAudioTranscription: {},
		outputAudioTranscription: {}
	};
}
function validateGoogleSpeechTranslationInputAudioFormat(inputAudioFormat) {
	if (inputAudioFormat.type !== "audio/pcm" || inputAudioFormat.rate != null && inputAudioFormat.rate !== 16e3) throw new InvalidArgumentError({
		argument: "inputAudioFormat",
		message: "The Gemini Live translation API only supports 16kHz 16-bit PCM input audio."
	});
}
var supportedExternalUrlMediaTypes = [
	"text/html",
	"text/css",
	"text/plain",
	"text/xml",
	"text/csv",
	"text/rtf",
	"text/javascript",
	"application/json",
	"application/pdf",
	"image/bmp",
	"image/jpeg",
	"image/png",
	"image/webp",
	"video/mp4",
	"video/mpeg",
	"video/quicktime",
	"video/avi",
	"video/x-flv",
	"video/mpg",
	"video/webm",
	"video/wmv",
	"video/3gpp"
];
var externalHttpsUrlPattern = /^https:\/\/.*$/;
function supportsExternalFileUrls(modelId) {
	return /(^|\/)gemini-/.test(modelId) && !/(^|\/)gemini-2\.0/.test(modelId);
}
function createGoogle(options = {}) {
	var _a, _b;
	const baseURL = (_a = withoutTrailingSlash(options.baseURL)) != null ? _a : "https://generativelanguage.googleapis.com/v1beta";
	const providerName = (_b = options.name) != null ? _b : "google.generative-ai";
	const getHeaders = () => withUserAgentSuffix({
		"x-goog-api-key": loadApiKey({
			apiKey: options.apiKey,
			environmentVariableName: "GOOGLE_GENERATIVE_AI_API_KEY",
			description: "Google Generative AI"
		}),
		...options.headers
	}, `ai-sdk/google/${VERSION}`);
	const createChatModel = (modelId) => {
		var _a2;
		return new GoogleBatchLanguageModel(modelId, {
			provider: providerName,
			baseURL,
			headers: getHeaders,
			generateId: (_a2 = options.generateId) != null ? _a2 : generateId,
			supportedUrls: () => ({
				"*": [
					new RegExp(`^${baseURL}/files/.*$`),
					new RegExp(`^https://(?:www\\.)?youtube\\.com/watch\\?v=[\\w-]+(?:&[\\w=&.-]*)?$`),
					new RegExp(`^https://youtu\\.be/[\\w-]+(?:\\?[\\w=&.-]*)?$`)
				],
				...supportsExternalFileUrls(modelId) ? Object.fromEntries(supportedExternalUrlMediaTypes.map((mediaType) => [mediaType, [externalHttpsUrlPattern]])) : {}
			}),
			fetch: options.fetch
		});
	};
	const createEmbeddingModel = (modelId) => new GoogleEmbeddingModel(modelId, {
		provider: providerName,
		baseURL,
		headers: getHeaders,
		fetch: options.fetch
	});
	const createImageModel = (modelId, settings = {}) => new GoogleImageModel(modelId, settings, {
		provider: providerName,
		baseURL,
		headers: getHeaders,
		fetch: options.fetch
	});
	const createFiles = () => new GoogleFiles({
		provider: providerName,
		baseURL,
		headers: getHeaders,
		fetch: options.fetch
	});
	const createVideoModel = (modelId) => {
		var _a2;
		return new GoogleVideoModel(modelId, {
			provider: providerName,
			baseURL,
			headers: getHeaders,
			fetch: options.fetch,
			generateId: (_a2 = options.generateId) != null ? _a2 : generateId
		});
	};
	const createRealtimeModel = (modelId) => new GoogleRealtimeModel(modelId, {
		provider: `${providerName}.realtime`,
		baseURL,
		headers: getHeaders,
		fetch: options.fetch
	});
	const createSpeechTranslationModel = (modelId) => new GoogleSpeechTranslationModel(modelId, {
		provider: `${providerName}.speech-translation`,
		baseURL,
		headers: getHeaders,
		webSocket: options.webSocket
	});
	const createSpeechModel = (modelId) => new GoogleSpeechModel(modelId, {
		provider: `${providerName}.speech`,
		baseURL,
		headers: getHeaders,
		fetch: options.fetch
	});
	const createTranscriptionModel = (modelId) => new GoogleTranscriptionModel(modelId, {
		provider: `${providerName}.transcription`,
		baseURL,
		headers: getHeaders,
		fetch: options.fetch,
		webSocket: options.webSocket
	});
	const experimentalRealtimeFactory = Object.assign((modelId) => createRealtimeModel(modelId), { getToken: async (tokenOptions) => {
		const secret = await createRealtimeModel(tokenOptions.model).doCreateClientSecret({
			sessionConfig: tokenOptions.sessionConfig,
			expiresAfterSeconds: tokenOptions.expiresAfterSeconds
		});
		return {
			token: secret.token,
			url: secret.url,
			expiresAt: secret.expiresAt
		};
	} });
	const createInteractionsModel = (modelIdOrAgent) => {
		var _a2;
		return new GoogleInteractionsLanguageModel(modelIdOrAgent, {
			provider: `${providerName}.interactions`,
			baseURL,
			headers: getHeaders,
			generateId: (_a2 = options.generateId) != null ? _a2 : generateId,
			fetch: options.fetch
		});
	};
	const provider = function(modelId) {
		if (new.target) throw new Error("The Google Generative AI model function cannot be called with the new keyword.");
		return createChatModel(modelId);
	};
	provider.specificationVersion = "v4";
	provider.languageModel = createChatModel;
	provider.chat = createChatModel;
	provider.generativeAI = createChatModel;
	provider.embedding = createEmbeddingModel;
	provider.embeddingModel = createEmbeddingModel;
	provider.textEmbedding = createEmbeddingModel;
	provider.textEmbeddingModel = createEmbeddingModel;
	provider.image = createImageModel;
	provider.imageModel = createImageModel;
	provider.video = createVideoModel;
	provider.videoModel = createVideoModel;
	provider.experimental_realtime = experimentalRealtimeFactory;
	provider.files = createFiles;
	provider.speech = createSpeechModel;
	provider.speechModel = createSpeechModel;
	provider.transcription = createTranscriptionModel;
	provider.transcriptionModel = createTranscriptionModel;
	provider.translation = createSpeechTranslationModel;
	provider.speechTranslationModel = createSpeechTranslationModel;
	provider.interactions = createInteractionsModel;
	provider.tools = googleTools;
	return provider;
}
createGoogle();
//#endregion
export { createGoogle as t };
