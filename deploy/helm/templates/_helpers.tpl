{{- define "chart.image" -}}
{{ .Values.image.repository }}:{{ .Values.image.tag }}
{{- end }}
