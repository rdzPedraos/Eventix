{{- define "chart.image" -}}
{{ .Values.image.repository }}:{{ .Values.image.tag }}
{{- end }}

{{- define "chart.domain" -}}
{{- if gt (int .Values.pr.number) 0 -}}
pr-{{ .Values.pr.number }}.{{ .Values.pr.domain }}
{{- else -}}
{{ .Values.pr.domain }}
{{- end -}}
{{- end }}
