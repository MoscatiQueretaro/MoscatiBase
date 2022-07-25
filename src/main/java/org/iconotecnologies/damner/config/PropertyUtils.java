package org.iconotecnologies.damner.config;

import java.util.HashMap;
import java.util.Map;

public class PropertyUtils {

    public static Map<String, Object> parsePropertyMap(Map<String, Object> map, String keyPrefix) {
        Map<String, Object> result = new HashMap<>();
        for (Map.Entry<String, Object> entry : map.entrySet()) {
            String key = (keyPrefix != null) ? keyPrefix + "." + entry.getKey() : entry.getKey();
            if (entry.getValue() instanceof Map) {
                result.putAll(parsePropertyMap((Map) entry.getValue(), key));
            } else {
                result.put(key, entry.getValue());
            }
        }
        return result;
    }
}
